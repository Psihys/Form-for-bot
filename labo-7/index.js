// Генерація масиву випадкових чисел
function generateRandomArray(size, min = 0, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )
}

const InsertionSort = (randomArray) => {
  for (let i = 1; i < randomArray.length; i++) {
    const key = randomArray[i]
    let j = i - 1
    while (j >= 0 && randomArray[j] > key) {
      randomArray[j + 1] = randomArray[j]
      j = j - 1
    }
    randomArray[j + 1] = key
  }
  return randomArray // Return the sorted array
}

function sortArrayMergesort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  console.log('Left part:', left)
  console.log('Right part:', right)
  return merge(sortArrayMergesort(left), sortArrayMergesort(right))
}
function merge(left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0
  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

function saveToFile(filename, data) {
  const blob = new Blob([data.join(', ')], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, filename)
}

function userInterface() {
  const size = parseInt(prompt('Введіть об’єм випадкової послідовності:'))

  if (isNaN(size) || size <= 0) {
    alert('Некоректний розмір масиву. Спробуйте ще раз.')
    return
  }

    const randomArray = generateRandomArray(size);
    console.log('Сгенерований масив:', randomArray);

    saveToFile('sequence.txt', randomArray)

    let startTime = performance.now();
    const sortedArray = InsertionSort([...randomArray]) // Sort a copy of the array
    console.log('Масив після сортування вставками:', sortedArray);
    let endTime = performance.now();
    console.log('Витрачений час:', endTime - startTime, 'мс');
    let result = endTime - startTime
    alert('Витрачений час: ' + result + 'мс')

    saveToFile('sorted_sequence_insertion.csv', sortedArray)

   
        let start = performance.now();
        const sortedArrayMergesort = sortArrayMergesort([...randomArray])
        let end = performance.now();
        console.log('Sorted Array:', sortedArrayMergesort)
        console.log('Time taken to sort array using Merge Sort:', end - start, 'milliseconds')
        let result2 = end - start
        alert(
          'Витрачений час сортування масиву за допомогою Merge Sort: '
          + result2 +
         'мс'
        )
        saveToFile('sorted_sequence_mergesort.csv', sortedArrayMergesort)

    
}

// Запуск інтерфейсу
userInterface()

