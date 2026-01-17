// Objects, destructing objects 

const obj1 = {
  name: 'Bohdan',
  age: 21,
  address: {
    city: 'Kiev',
    street: 'Shevchenka',
  },
  makeTest: function () {
    console.log('test')
  },
}

let counter1 = 0
// console.log(obj1) - Run through all keys in object
for (let key in obj1) {
  console.log(key, obj1[key])
  counter1++

  for (let key2 in obj1[key]) {
    if (typeof obj1[key] === 'object') {
      console.log(key2, obj1[key][key2])
      counter1++
    } else {
    }
  }
}

console.log(counter1)

// console.log(Object.keys(obj1)) // Return array with keys
console.log(Object.keys(obj1).length)

// call function from object
obj1.makeTest()

// Destructuring the object 
const {city, street} = obj1.address

