import bodyParser from 'body-parser'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

let bandName =""

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

const bandNameGeneratore = (req,res,next) =>{
  console.log(req.body["street"] + req.body["pet"])
  bandName = req.body["street"] + req.body["pet"]
  next()
}

app.use(bandNameGeneratore)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/submit', (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`)
})