const product = prompt('Enter the product to check the prijs')

const productPrice = document.getElementById("product_price")
let price

switch (product.toLowerCase()) {
  case 'apple':
    price = 10
    
    break;

    case 'orange':
    price = 15

    break;

    case 'banana':
    price = 5
   
    break;

    default:
        price = "Unknown product"
}

console.log(price)

productPrice.textContent = price