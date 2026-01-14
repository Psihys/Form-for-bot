const usdCurr = 28;
const discount = 0.9;

const convert = (amount, curr) => {
  console.log(amount * curr);
  return amount * curr;
}

const promotion = (result) => {
  console.log(result * discount);
  return result * discount;
}

console.log(convert(500, usdCurr));
console.log(promotion(convert(500, usdCurr)));