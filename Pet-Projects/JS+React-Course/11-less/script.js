// Massive and

const array = [1, 2, 3, 4, 5]

// remove the last element from massive
array.pop()
console.log(array)

// add element to massive
array.push(10)
console.log(array)

// run through massive
for (let i = 0; i < array.length; i++) {
  console.log(array[i])
}

// No logic
array[99] = 0
console.log(array.length)
console.log(array)

//ForEach method
array.forEach((element, number, array) => {
  console.log(`${number}: ${element} inside ${array}`)
})

// Split method
const str = prompt('')
const products = str.split(',')
// Log massive with coma
console.log(products)
// Log string with coma and space
console.log(products.join(', '))
// Log sorted massive
console.log(products.sort())

// Sort array with numbers
const array2 = [1, 12, 41, 54, 65, 2, 3, 6]
const comparNum = (a, b) => {
  return a - b
}
console.log(array2.sort(comparNum))

// Pseudo massive - (array-like object) it is an object, which looks like massive, has number index and length but not a true massive
const pseudo = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

pseudo.push('d')   // will be error 