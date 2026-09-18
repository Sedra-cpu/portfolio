let cart = [];

function addToCart(item) {
  cart.push(item);

  console.log(cart); // للتأكد

  document.getElementById("cartCount").innerText = cart.length;
}