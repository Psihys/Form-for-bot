export const getAllProducts = async () => {
  const data = await fetch('http://localhost:5000/api/products')
  return data.json()
}

export const getProductById = async (id) => {
  const data = await fetch(`http://localhost:5000/api/products/${id}`)
  return data.json()
}

export const createProduct = async (product) => {
  const data = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return data.json()
}

export const updateProduct = async (id, product) => {
  const data = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return data.json()
}

export const deleteProduct = async (id) => {
  const data = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: 'DELETE',
  })
  return data.json()
}
