import inquirer from 'inquirer'
import qr from 'qr-image'
import fs from 'fs'
import { url } from 'inspector'

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'input',
      name: 'age',
      message: 'How old are you?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
  ])
  .then((answers) => {
    console.log(
      `Hello ${answers.name}, you are ${answers.age} years old and your email is ${answers.email}`
    )
    const data = answers.email
    const qr_svg = qr.image(data, { type: 'png' })
    qr_svg.pipe(fs.createWriteStream('email_qr.png'))
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something else went wrong')
    }
  })
