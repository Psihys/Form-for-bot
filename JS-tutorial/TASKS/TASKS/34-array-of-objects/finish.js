/** ЗАДАЧА 34 - Массив объектов
 *
 * 1. Создайте массив с 3 объектами "cars"
 *
 * 2. Каждый объект должен иметь три свойства
 *  - carBrand (строка)
 *  - price (число)
 *  - isAvailableForSale (логическое значение)
 *
 * 3. Добавьте еще один объект в массив
 *
 * 4. Выведите результирующий массив в консоль
 */
const object = [
    {
        carBrand: 'BMW',
        price: 10000,
        isAvailableForSale: true
    },
    {
        carBrand: 'Audi',
        price: 20000,
        isAvailableForSale: false
    },
    {
        carBrand: 'Mercedes',
        price: 30000,
        isAvailableForSale: true
    },
    {
        carBrand: 'Volkswagen',
        price: 40000,
        isAvailableForSale: false
    }
]

console.log(object);