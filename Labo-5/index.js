// Бінарний пошук
function binarySearch(arr, K) {
    let l = 0;
    let u = arr.length - 1;

    while (l <= u) {
        let i = Math.floor((l + u) / 2);
        if (arr[i] === K) {
            return i; // Позиція шуканого елемента
        } else if (arr[i] < K) {
            l = i + 1;
        } else {
            u = i - 1;
        }
    }
    return -1; // Якщо елемент не знайдено
}

// Лінійний послідовний пошук
function linearSearch(arr, K) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === K) {
            return i;
        }
    }
    return -1;
}

// Вимірювання часу бінарного пошуку
function measureBinarySearch(arr, K) {
    const startTime = performance.now();
    const result = binarySearch(arr, K);
    const endTime = performance.now();
    return {
        position: result,
        time: endTime - startTime // час виконання в мілісекундах
    };
}

// Вимірювання часу лінійного пошуку
function measureLinearSearch(arr, K) {
    const startTime = performance.now();
    const result = linearSearch(arr, K);
    const endTime = performance.now();
    return {
        position: result,
        time: endTime - startTime // час виконання в мілісекундах
    };
}

// Генерація відсортованого масиву випадкових чисел
function generateSortedArray(size) {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return arr.sort((a, b) => a - b);
}

// Виконання пошуку та відображення результатів
function performSearch() {
    const size = parseInt(document.getElementById('arraySize').value);
    const K = parseInt(document.getElementById('searchValue').value);
    const arr = generateSortedArray(size);

    const binaryResult = measureBinarySearch(arr, K);
    const linearResult = measureLinearSearch(arr, K);

    document.getElementById('result').innerHTML = `
        <p>Бінарний пошук: позиція = ${binaryResult.position}, час = ${binaryResult.time.toFixed(4)} мс</p>
        <p>Лінійний пошук: позиція = ${linearResult.position}, час = ${linearResult.time.toFixed(4)} мс</p>
        <p>Згенерована послідовність (для перевірки): ${arr.join(', ')}</p>
    `;
}
