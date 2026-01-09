import Product from '../models/product.model.js'
import redis from '../lib/redis.js'
import cloudinary from '../lib/cloudinary.js'


// Additional function for toggling featured status, to update cache accordingly

const updateFeaturedProductsCache = async () => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean()
        await redis.set(
            'featured_products',
            JSON.stringify(featuredProducts),
            'EX',
            3600
        )

        res.status(200).json(featuredProducts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error updating cache for featured products' })
    }
}



export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
    res.send(201).json(allProducts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get('featured_products')

    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts))
    }
    // If not in cache, fetch from database
    featuredProducts = await Product.find({ isFeatured: true }).lean() // .lean() returns plain JS objects

    // Store in Redis cache for future requests
    await redis.set(
      'featured_products',
      JSON.stringify(featuredProducts),
      'EX',
      3600
    ) // Cache for 1 hour

    res.status(200).json(featuredProducts)
  } catch (error) {}
}

export const getRecomendedProducts = async (req, res) => {
  try {
    const recommendedProducts = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ])

    res.status(200).json(recommendedProducts)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Server error: Error to get recommended products' })
  }
}

export const getProductPage = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
    console.log(error)
  }
}

export const getCategoryProducts = async (req, res) => {
  const { category } = req.params
  try {
    const products = await Product.find({ category })
    res.status(201).json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Server error: ${category} not found` })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body
    let claudinaryResponse = null

    if (image) {
      await cloudinary.uploader.upload(image, { folder: 'products' })
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: claudinaryResponse?.secure_url || image,
      category,
    })

    res.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ message: 'Server error: Error to create product' })
  }
}

export const toggleFeaturedProduct = async (req, res) => {
    const { id } = req.params   
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        product.isFeatured = !product.isFeatured
        const updatedProduct = await product.save() 

        await updateFeaturedProductsCache()

        res.status(200).json({ message: 'Product updated successfully', updatedProduct })
    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
    }

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0]
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`)
      } catch (error) {}
    }
    const deletedProduct = await Product.findByIdAndDelete(id)
    res
      .status(200)
      .json({ message: 'Product deleted successfully', deletedProduct })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ message: 'Server error: Error to delete product' })
  }
}
