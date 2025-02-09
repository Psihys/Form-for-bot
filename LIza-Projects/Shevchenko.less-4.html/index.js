const answer = document.getElementById('answer')
const button = document.querySelector('button')

button.addEventListener('click', (e) => {
  e.preventDefault()
  let text = answer.value
  if (text === '') {
    alert('Введіть текст')
  } else if (text === 'Орел' || text === 'орел') {
    alert('Правильна відповідь, молодець!')
  } else {
    alert('Неправильна відповідь, спробуй ще!')
  }

  answer.value = ''
})
