const button = document.querySelector('button')
const firstDice = document.querySelectorAll('img')[0]
const secondDice = document.querySelectorAll('img')[1]
const title = document.querySelector('h1')

button.addEventListener('click', (e) => {
  let randomNumber1 = Math.floor(Math.random() * 6) + 1
  let randomNumber2 = Math.floor(Math.random() * 6) + 1

  let randomDiceImage1 = './images/dice' + randomNumber1 + '.png'
  let randomDiceImage2 = './images/dice' + randomNumber2 + '.png'

  e.preventDefault()
  firstDice.setAttribute('src', randomDiceImage1)
  secondDice.setAttribute('src', randomDiceImage2)

  if (randomNumber1 > randomNumber2) {
    title.textContent = '🚩 Player 1 Wins!'
  } else if (randomNumber2 > randomNumber1) {
    title.textContent = 'Player 2 Wins! 🚩'
  } else {
    title.textContent = 'Draw!'
  }
})
