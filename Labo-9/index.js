
const generateRandomArray = (size, min = 0, max = 10) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

const piramidAlgoritm = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        piramidAlgoritm(arr, n, largest);
        console.log(arr);
        console.log("-----------------------------------");
    }
}

const heapSort = (arr) => {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        piramidAlgoritm(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        piramidAlgoritm(arr, i, 0);
    }

}

const userInterface = () => {
    const size = parseInt(prompt("Enter the size of the array:"));
    
    if (isNaN(size) || size <= 0) {
        alert("Invalid size. Please try again.");
        return;
    }

    const randomArray = generateRandomArray(size);
    console.log("Generated array:", randomArray);

    heapSort(randomArray);
    console.log("Sorted array:", randomArray);


}

userInterface();