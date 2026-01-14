const fib = (number) => {
    if (typeof num !== 'number' || num <= 0 || !Number.isInteger(num)) {
    return '';
  }
  let result = '0'
  let first = 0
  let second = 1

  for (let i = 1; i < number; i++) {
    result += ` ${second}`
    next = first + second
    first = second
    second = next
  }
  console.log(result)
  return result
}
fib(7)
