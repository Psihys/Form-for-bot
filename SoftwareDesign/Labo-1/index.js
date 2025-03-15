const handleFindFunction = (item) => {
  const output = document.getElementById('output')
  output.textContent = '' // Очищаем предыдущий вывод

  const m = item.length
  const n = item[0]?.length || 0

  if (m === 0 || n === 0) {
    output.textContent = 'Матрица пуста или содержит некорректные данные.'
    return
  }

  let resultText = ''
  for (let i = 0; i < m; i++) {
    let result = 0
    for (let j = 1; j < n; j++) {
      if (item[i][j] > item[i][0]) {
        result += 1
      }
    }
    resultText += `Строка ${i + 1}: найдено ${result} элементов\n`
  }

  output.textContent = resultText
}

document.getElementById('fileInput').addEventListener('change', function () {
  const file = this.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = function (event) {
    try {
      const text = event.target.result.trim()
      const item = text.split('\n').map((line) => line.split(' ').map(Number))

      if (item.some((row) => row.some(isNaN))) {
        throw new Error('Файл содержит нечисловые значения.')
      }

      handleFindFunction(item)
    } catch (error) {
      document.getElementById('output').textContent = 'Ошибка: ' + error.message
    }
  }

  reader.readAsText(file)
})
