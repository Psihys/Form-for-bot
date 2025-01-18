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
    return -1; 
}

function algorithmQ(array, target) {
    // Add the target as a sentinel
 // This simulates the K(N+1) for the algorithm
    let i = 0;

    while (array[i] !== target) {
        i++; // Increment i
    };

    if (i < array.length - 1) {
        return i; // Return the position of the found element
    } else {
        return -1; // If not found
    };
};

function userInterface() {
    const size = parseInt(prompt("Введіть об’єм випадкової послідовності:"));
    const target = parseInt(prompt("Введіть аргумент пошуку:"));
    const randomArray = generateRandomArray(size);
    randomArray.push(target);
    
    console.log("Сгенерований масив:", randomArray);

    const positionS = algorithmS(randomArray, target);
    console.log(`Результат простого пошуку (алгоритм S): ${positionS === -1 ? "Елемент не знайдено" : `Елемент знайдено на позиції ${positionS}`}`);

    const positionQ = algorithmQ([...randomArray], target); // Use a copy of the array for Q
    console.log(`Результат швидкого послідовного пошуку (алгоритм Q): ${positionQ === -1 ? "Елемент не знайдено" : `Елемент знайдено на позиції ${positionQ}`}`);

    if (positionS !== -1) {
        console.log(`Елемент за позицією ${positionS}: ${randomArray[positionS]}`);
    }
}

// Запуск інтерфейсу
userInterface();

