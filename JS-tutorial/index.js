// console.log('hello world')

// const obj1 = {
//   name: 'John',
//   age: 30,
//   city: 'New York',
//   jobInfo: {
//     prevJob: 'Teacher',
//     currentJob: 'Engineer',
//     salaryInfo: {
//       prevSalary: 30000,
//       currentSalary: 50000,
//     },
//   },
// }

// const obj2 = {
//   name: 'Jane',
//   age: 25,
//   city: 'New York',
//   jobInfo: {
//     prevJob: 'Teacher',
//     currentJob: 'Engineer',
//     salaryInfo: {
//       prevSalary: 30000,
//       currentSalary: 50000,
//     },
//   },
//   importantInfo: function(){
//     console.log(`Expected salary is ${this.jobInfo.salaryInfo.currentSalary}`)
//   }
// }

// obj1.jobInfo.salaryInfo.currentSalary = 60000
// console.log(obj1)

// const stringifyJSON = JSON.stringify(obj1)
// console.log(stringifyJSON)

// const objCopy = JSON.parse(JSON.stringify(obj1))

// const obj3 = { ...obj1, hobbies:"Play pc-games"}
// console.log(obj3)

// const areObjectsEqual = (object1, object2) =>{
//     if(typeof object1 !== "object" || typeof object2 !== "object" || object1 === null || object2 === null){
//         return object1 === object2
//     }

//     const key1 = Object.keys(object1)
//     console.log(key1)

//     const key2 = Object.keys(object2)
//     console.log(key2)

//     if(key1.length !== key2.length){
//         return false
//     }

//     for(let key of key1){
//         if(!key2.includes(key)){
//             return false
//         }

//         if(!areObjectsEqual(object1[key], object2[key])){
//             return false
//         }
//     }

//     return true
// }

// console.log(areObjectsEqual(obj1, obj2))

// const showObjectKeys = (object) =>{
//     if( typeof object !== "object" || object === null){
//         return
//     }

//     const keys = Object.keys(object)

//     for (let key of keys){
//         const value = object[key]

//         if(typeof value === "object" && value !== null){
//             showObjectKeys(value)
//         }else {
//             console.log(`${key}: ${value}`)
//         }
//     }
// }

// showObjectKeys(obj1)

// const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(myArray)

// myArray.push(11)
// console.log(myArray)

// myArray.pop()
// console.log(myArray)

// myArray.shift()
// console.log(myArray)

// myArray.unshift(1)
// console.log(myArray)

// myArray.splice(5, 3)
// console.log(myArray)

// console.log('ForEach')
// myArray.forEach((element, index) => {
//   console.log(`Element at index ${index}: ${element}`)
// })

// console.log('Mapping')
// const mapArray = myArray.map((element, index) => {
//   console.log(`Element at index ${index}: ${element}`)
//   return element * 2
// })
// console.log(mapArray)
// console.log(myArray)

// const findArray = myArray.find((element) => element > 4)
// console.log(findArray)

// const find2Arrray = myArray.find((element) => {
//   return element > 5
// })
// console.log(find2Arrray)

// const filterArray = myArray.filter((element) => element > 4)
// console.log(filterArray)