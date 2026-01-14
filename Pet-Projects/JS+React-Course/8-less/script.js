const getTimeFromMinutes = (time ) => {
  if (
    typeof time !== 'number' ||
    time < 0 ||
    !Number.isInteger(time) ||
    isNaN(time) ||
    time > 600
  ) {
    console.log('Ошибка, проверьте данные')
  }
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  console.log(hours, minutes)

  return `The time is ${hours} hours and ${minutes} minutes`
}

getTimeFromMinutes(150)

const findMaxNumber = (a, b, c, d) => {
  if (
    typeof a !== 'number' ||
    typeof b !== 'number' ||
    typeof c !== 'number' ||
    typeof d !== 'number'
  ) {
    return 0
  }
  return Math.max(a, b, c, d)
}

findMaxNumber(4,5,6,7)