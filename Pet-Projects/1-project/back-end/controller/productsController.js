import Product from '../models/product.js'

// Get all products
export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({})
  res.status(200).json(allProducts)
}
// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    res.status(500).json({ message: 'Error fetching product', error })
  }
}
// Create a new product
export const createNewProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  console.log(product)

  const newProdct = new Product(product)

  try {
    await newProdct.save()
    res.status(201).json({ message: 'Data received', product })
  } catch (error) {
    console.error('Error saving data:', error)
    res.status(500).json({ message: 'Error saving data', error })
  }
}
// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params
  const updateProduct = req.body

  if (!updateProduct.name || !updateProduct.price || !updateProduct.image) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updateProduct, {
      new: true,
    })
    res.status(200).json({ message: 'Product updated', product })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ message: 'Error updating product', error })
  }
}
//  Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ message: 'Error deleting product', error })
  }
}
