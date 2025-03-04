const m = 5
const n = 4

const item = [
  [1, 2, 3, 4],
  [4, 5, 6, 7],
  [7, 8, 9, 10],
  [13, 14, 15, 16],
  [3, 2, 1, 0],
]

const handleFindFunction = () => {
  for (let i = 0; i < m; i++) {
    let result = 0
    for (let j = 1; j < n; j++) {
      if (item[i][j] > item[i][0]) {
        result += 1
      }
    }
    console.log(`Строка ${i + 1}: найдено ${result} элементов`)
  }
}

handleFindFunction()
