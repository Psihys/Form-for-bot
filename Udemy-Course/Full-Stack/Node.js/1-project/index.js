// console.log('Hello World');
// const fs = require('fs');

// fs.writeFile("message.txt","Hello from node.js", (err) =>{
//     if(err) throw err.message;
//     console.log('The file has been saved')
// })

// fs.readFile('./message.txt', 'utf8', (err, data) => {
//     if(err) throw err.message;
//     console.log(data);
// })
import generateName from 'sillyname'

let value = 0
while (value < 10) {
  let sillyname = generateName()
  console.log(`My name is ${sillyname}`)
  value++
}
