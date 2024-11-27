function generateRandomArray(size, min = 0, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )
}

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

function intersectConversion(arr1, arr2) {
  // Перетворення одного масиву на Set
  const set = new Set(arr1)
  // Фільтрування елементів другого масиву, що знаходяться у Set
  const intersection = arr2.filter((item) => set.has(item))
  return intersection
};

const userInterface = () => {
    const size = parseInt(prompt('Введіть 1 об’єм випадково�� послідовності:'))

    const size2 = parseInt(prompt('Введіть 2 об’єм випадково�� послідовності:'))
    
    if (isNaN(size) || size <= 0) {
        alert('Некоректний розмір масиву. Спробуйте ��е раз.')
        return
    }

    if (isNaN(size2) || size2 <= 0) {
      alert('Некоректний розмір масиву. Спробуйте ��е раз.')
      return
    }

    const array1 = generateRandomArray(size);
    console.log(array1);

    const array2 = generateRandomArray(size2)
    console.log(array2);

    let start = performance.now()
    const intersectionBruteForceResult = intersectBruteForce(array1, array2);
    let end = performance.now()
    console.log('Об’єднане множинне з використанням брутфорса:', intersectionBruteForceResult);
    console.log("Time result: " + (end - start));
    
    let start1 = performance.now()
    const intersectionConversionResult = intersectConversion(array1, array2);
    let end1 = performance.now()
    console.log('Об’єднане множинне з використанням конвертаці��:', intersectionConversionResult);
    console.log("Time result: " + (end1 - start1));

    alert('Result: ' + intersectionBruteForceResult)
    alert('Result: ' + intersectionConversionResult)

    // Запуск ��нтерфейсу

}

userInterface();

