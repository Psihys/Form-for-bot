const buttons = document.querySelectorAll('.drum')

const handleClick = (e) => {
  // console.log(e.target)
  // console.log(e.target.textContent)

  let key

  if (e.type === 'click') {
    key = e.target.textContent
  } else {
    key = e.key
  }
  // console.log(key)
  if (key === 'w') {
    const audio = new Audio(`./sounds/tom-1.mp3`)
    audio.play()
  } else if (key === 'a') {
    const audio = new Audio(`./sounds/tom-2.mp3`)
    audio.play()
  } else if (key === 's') {
    const audio = new Audio(`./sounds/tom-3.mp3`)
    audio.play()
  } else if (key === 'd') {
    const audio = new Audio(`./sounds/tom-4.mp3`)
    audio.play()
  } else if (key === 'j') {
    const audio = new Audio(`./sounds/snare.mp3`)
    audio.play()
  } else if (key === 'k') {
    const audio = new Audio(`./sounds/crash.mp3`)
    audio.play()
  } else if (key === 'l') {
    const audio = new Audio(`./sounds/kick-bass.mp3`)
    audio.play()
  } else {
    console.log('Error')
  }
}

const handleAnimation = (e) => {
  if (e.type === 'click') {
    e = e.target
    e.classList.add('pressed')
    setTimeout(() => {
      e.classList.remove('pressed')
    }, 500)
  } else {
    buttons.forEach((button) => {
      if (button.textContent === e.key) {
        button.classList.add('pressed')
        setTimeout(() => {
          button.classList.remove('pressed')
        }, 500)
      }
    })
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleClick(e)
    handleAnimation(e)
  })
})

document.addEventListener('keydown', (e) => {
  handleClick(e)
  handleAnimation(e)
})
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', () => {
//     console.log(buttons[i].textContent)
//     console.log(i)
//     if (i < 4) {
//       const audio = new Audio(`./sounds/tom-${i + 1}.mp3`)
//       audio.play()
//     } else if ((i === 4)) {
//       const audio = new Audio(`./sounds/snare.mp3`)
//       audio.play()
//     } else if ((i === 5)) {
//       const audio = new Audio(`./sounds/crash.mp3`)
//       audio.play()
//     } else {
//       const audio = new Audio(`./sounds/kick-bass.mp3`)
//       audio.play()
//     }
//   })
// }
