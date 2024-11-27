let array = [];
function generateRandomArray(size, min = 0, max = 100) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    console.log("Generated Array:", array);
    return array;
}

function sortArrayMergesort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    console.log("Left part:", left);
    console.log("Right part:", right);

    return merge(sortArrayMergesort(left), sortArrayMergesort(right));
}

function merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft]);
            indexLeft++;
        } else {
            result.push(right[indexRight]);
            indexRight++;
        }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

const size = parseInt(prompt("Enter the Array size"), 10);

if (!isNaN(size) && size > 0) {
    generateRandomArray(size);
    const sortedArray = sortArrayMergesort(array);
    console.log("Sorted Array:", sortedArray);
} else {
    console.error("Please enter a valid array size.");
}
