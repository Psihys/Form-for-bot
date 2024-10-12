// Генерація масиву випадкових чисел
function generateRandomArray(size, min = 0, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Алгоритм S (простий пошук)
function algorithmS(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i; // Повертає позицію першого входження
        }
    }
    return -1; // Якщо не знайдено
}

// Алгоритм Q (двійковий пошук)
function algorithmQ(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] === target) {
            return mid; // Повертає позицію першого входження
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1; // Якщо не знайдено
}

// Інтерфейс користувача
function userInterface() {
    const size = parseInt(prompt("Введіть об’єм випадкової послідовності:"));
    const target = parseInt(prompt("Введіть аргумент пошуку:"));
    const randomArray = generateRandomArray(size);
    
    console.log("Сгенерований масив:", randomArray);

    const positionS = algorithmS(randomArray, target);
    console.log(`Результат простого пошуку (алгоритм S): ${positionS === -1 ? "Елемент не знайдено" : `Елемент знайдено на позиції ${positionS}`}`);

    // Для двійкового пошуку масив повинен бути відсортований
    const sortedArray = [...randomArray].sort((a, b) => a - b);
    console.log("Відсортований масив:", sortedArray);

    const positionQ = algorithmQ(sortedArray, target);
    console.log(`Результат двійкового пошуку (алгоритм Q): ${positionQ === -1 ? "Елемент не знайдено" : `Елемент знайдено на позиції ${positionQ}`}`);

    if (positionS !== -1) {
        console.log(`Елемент за позицією ${positionS}: ${randomArray[positionS]}`);
    }
}

// Запуск інтерфейсу
userInterface();
