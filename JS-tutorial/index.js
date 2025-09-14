console.log('hello world')

const obj1 = {
  name: 'John',
  age: 30,
  city: 'New York',
  jobInfo: {
    prevJob: 'Teacher',
    currentJob: 'Engineer',
    salaryInfo: {
      prevSalary: 30000,
      currentSalary: 50000,
    },
  },
}

const obj2 = {
  name: 'Jane',
  age: 25,
  city: 'New York',
  jobInfo: {
    prevJob: 'Teacher',
    currentJob: 'Engineer',
    salaryInfo: {
      prevSalary: 30000,
      currentSalary: 50000,
    },
  },
  importantInfo: function(){
    console.log(`Expected salary is ${this.jobInfo.salaryInfo.currentSalary}`)
  }
}

console.log(obj1)
delete obj1.jobInfo.salaryInfo.currentSalary
obj2.importantInfo()

const stringifyJSON = JSON.stringify(obj1)
console.log(stringifyJSON)

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
