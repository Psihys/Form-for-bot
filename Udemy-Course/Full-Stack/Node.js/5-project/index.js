//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

const passwordChcker = (req,res,next) =>{
    const password = req.body["password"]
    if(password === "ILoveProgramming"){
        next()
    }else{
        res.send("<h1>Wrong password</h1>")
    }
}

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/check', passwordChcker, (req, res) => {
  res.sendFile(__dirname + '/public/secret.html')
})