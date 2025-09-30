/** ЗАДАЧА 18 - Перебор элементов массива
 *
 * 1. Создайте массив с несколькими элементами
 *
 * 2. Используя один из методов массивов, переберите все элементы
 * и выведите каждый элемент в консоль
 */
let array = [1, 'string', true]

array.forEach((element) => {
    console.log(element);
})

const array2 = array.map((element) => element * 2);
console.log(array2);