// Генерація випадкового масиву
function generateRandomArray(size, min = 0, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// Алгоритм сортування злиттям (MergeSort)
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

// Функція для злиття двох відсортованих масивів
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

// Алгоритм перетину масивів за допомогою "брутальної сили"
function intersectBruteForce(arr1, arr2) {
  let intersection = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        intersection.push(arr1[i])
        break // Зупиняємось, якщо знайдено співпадіння
      }
    }
  }
  return intersection
}

// Оптимізований алгоритм перетину масивів через Set
function intersectConversion(arr1, arr2) {
  // Перетворення одного масиву на Set
  const set = new Set(arr1)
  // Фільтрування елементів другого масиву, що знаходяться у Set
  const intersection = arr2.filter((item) => set.has(item))
  return intersection
}

// Алгоритм сортування вставками (Insertion Sort)
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

// Алгоритм підтримки властивості купи (Heapify)
const piramidAlgoritm = (arr, n, i) => {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest != i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    piramidAlgoritm(arr, n, largest)
    console.log(arr)
    console.log('-----------------------------------')
  }
}

// Алгоритм сортування пірамідою (HeapSort)
const heapSort = (arr) => {
  const n = arr.length
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    piramidAlgoritm(arr, n, i)
  }
  for (let i = n - 1; i > 0; i--) {
    ;[arr[i], arr[0]] = [arr[0], arr[i]]
    piramidAlgoritm(arr, i, 0)
  }
}

// Функція розбиття масиву для QuickSort
function partition(arr, low, high) {
  const pivot = arr[high] // Вибираємо опорний елемент (pivot)
  let i = low - 1 // Індекс меншого елемента

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]] // Міняємо місцями елементи
    }
  }

  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]] // Переміщаємо pivot на його правильну позицію
  return i + 1 // Повертаємо індекс опорного елемента
}

// Алгоритм сортування швидким методом (QuickSort)
function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high) // Отримуємо індекс опорного елемента

    // Рекурсивно сортуємо елементи зліва і справа від опорного елемента
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }
}

const userInterface = () => {
  // Отримання розміру масиву від користувача
  const size = parseInt(prompt('Введіть розмір масиву:'))

  if (isNaN(size) || size <= 0) {
    alert('Некоректний розмір масиву. Спробуйте ще раз.')
    return
  }

  // Генерація випадкового масиву
  const randomArray = generateRandomArray(size)
  console.log('Згенерований масив:', randomArray)

  // Копії масиву для кожного алгоритму
  const mergeSortArray = [...randomArray]
  const insertionSortArray = [...randomArray]
  const heapSortArray = [...randomArray]
  const quickSortArray = [...randomArray]

  // Алгоритм сортування злиттям (MergeSort)
  console.time('MergeSort')
  const sortedMerge = sortArrayMergesort(mergeSortArray)
  console.timeEnd('MergeSort')
  console.log('Відсортований масив за допомогою MergeSort:', sortedMerge)

  // Алгоритм сортування вставками (InsertionSort)
  console.time('InsertionSort')
  InsertionSort(insertionSortArray)
  console.timeEnd('InsertionSort')
  console.log(
    'Відсортований масив за допомогою InsertionSort:',
    insertionSortArray
  )

  // Алгоритм сортування пірамідою (HeapSort)
  console.time('HeapSort')
  heapSort(heapSortArray)
  console.timeEnd('HeapSort')
  console.log('Відсортований масив за допомогою HeapSort:', heapSortArray)

  // Алгоритм сортування швидким методом (QuickSort)
  console.time('QuickSort')
  quickSort(quickSortArray, 0, quickSortArray.length - 1)
  console.timeEnd('QuickSort')
  console.log('Відсортований масив за допомогою QuickSort:', quickSortArray)
}

userInterface();