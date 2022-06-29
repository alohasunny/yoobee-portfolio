// cart starts here
var cartArray = [];
var cards = document.querySelectorAll(".button-buy");

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", onBuy);
}

function onBuy(event) {
  var clickedButton = event.target;
  var parentCard = clickedButton.closest(".card");

  var details = {};
  details.title = parentCard.getAttribute("data-title");
  details.format = parentCard.getAttribute("data-format");
  details.price = parentCard.getAttribute("data-price");

  console.log(details);

  addToCart(details);
  updateCartUI();
}

function addToCart(details) {
  cartArray.push(details);
  console.table(cartArray);
}

function updateCartUI() {
  var cartElement = document.querySelector(".cart");
  var spanElement = cartElement.querySelector("span");

  spanElement.innerHTML = cartArray.length;
}

// modal starts here
var myModal = document.querySelector(".modal");
var cartButton = document.querySelector(".cart");
var closeModalButton = document.querySelector(".cancel");

cartButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

function openModal() {
  updateCartModal();
  myModal.classList.remove("modal-hidden");
}

function closeModal() {
  eraseCartItems();
  myModal.classList.add("modal-hidden");
}

function eraseCartItems() {
  var myCartItems = document.querySelector(".cart-items");
  myCartItems.innerHTML = "";
}

function updateCartModal() {
  var totalPrice = 0;

  for (var i = 0; i < cartArray.length; i++) {
    addCartElement(i);
    totalPrice = totalPrice + parseInt(cartArray[i].price);
  }

  updateItemCountUI(cartArray.length);
  updateTotalPriceUI(totalPrice);
}

function addCartElement(i) {
  var myCartItems = document.querySelector(".cart-items");
  var cartItemElement = document.createElement("div");

  cartItemElement.innerHTML = cartArray[i].title + ", $" + cartArray[i].price;

  myCartItems.appendChild(cartItemElement);
}

function updateItemCountUI(itemCount) {
  document.querySelector(".item-count").innerHTML = itemCount;
}

function updateTotalPriceUI(totalPrice) {
  document.querySelector(".total-price").innerHTML =
    "$" + totalPrice.toFixed(2);
}
