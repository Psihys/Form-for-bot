const answer = document.getElementById('answer')
const button = document.querySelector('button')

button.addEventListener('click', (e) => {
  e.preventDefault()
  let text = answer.value
  if (text === '') {
    alert('Введіть текст')
  } else if (text === 'Море' || text === 'море') {
    alert('Правильна відповідь, молодець!')
  } else {
    alert('Неправильна відповідь, спробуй ще!')
  }

  answer.value = ''
})
