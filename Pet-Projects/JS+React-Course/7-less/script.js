const calculateVolumeAndArea = (length) => {
  if (isNaN(length) || length < 0) {
    return 'При вычислении произошла ошибка'
  }
  const volume = length * length * length
  const area = 6 * (length * length)
  return `Объем куба: ${volume}, площадь всей поверхности: ${area}`
}
calculateVolumeAndArea(5)

const getCoupeNumber = (seatNumber) => {
  if (isNaN(seatNumber) || seatNumber < 0 || seatNumber > 36) {
    alert('Ошибка. Проверьте правильность введенного номера места')
  }

  return Math.ceil(seatNumber / 4)
}

getCoupeNumber(5)
