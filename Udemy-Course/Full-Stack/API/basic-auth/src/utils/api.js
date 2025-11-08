import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
const port = 3000
const API_URL = 'https://secrets-api.appbrewery.com/'

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' })
})

app.get('/noAuth', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random secret' })
  }
})

app.get('/basicAuth', async (req, res) => {
  const authHeader = req.headers.authorization 
  if (!authHeader) return res.status(400).json({ error: 'No auth header' })

  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      headers: { Authorization: authHeader },
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Failed to fetch all secrets' })
  }
})


app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const response = await axios.post(`${API_URL}register`, {
      username,
      password,
    })
    res.json(response.data)
  } catch (err) {
    console.error('Registration error:', err.message)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
