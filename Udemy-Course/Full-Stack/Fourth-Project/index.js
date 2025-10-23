const buttonColors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let level = 0
let started = false
const title = document.querySelector('h1')
const buttons = document.querySelectorAll('.btn')

const nextSequence = () => {
  userClickedPattern = []
  level++
  title.textContent = 'Level ' + level
  const randomNumber = Math.floor(Math.random() * 4)
  gamePattern.push(buttonColors[randomNumber])
  for(let i = 0; i < gamePattern.length;i++){
    setTimeout(() => {
      playSound(gamePattern[i])
      animatePress(gamePattern[i])
    }, 1000 * i)
  }
}

const playSound = (e) => {
  let audio = new Audio('sounds/' + e + '.mp3')
  audio.play()
}
function animatePress(color) {
  $('#' + color).addClass('pressed')
  setTimeout(() => {
    $('#' + color).removeClass('pressed')
  }, 100)
}
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    playSound(e.target.id)
    animatePress(e.target.id)
    userClickedPattern.push(e.target.id)
    console.log(userClickedPattern)
    console.log(gamePattern)
    checkAnswers()
  })
})

const checkAnswers = () => {
  const currentIndex = userClickedPattern.length - 1
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  } else {
    console.log('❌ Ошибка')
    playSound('wrong')
    // Визуальный эффект ошибки
    $('body').addClass('game-over')
    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 200)

    // Сброс игры
    startOver()
  }
}
const startOver = () => {
  level = 0
  gamePattern = []
  started = false
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'a' && !started) {
    nextSequence()
    started = true
  }
})
