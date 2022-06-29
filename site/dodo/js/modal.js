var myModal = document.querySelector(".modal");
var myMeal = document.querySelector(".my-meal");
var myCancelButton = document.querySelector(".cancel");

myMeal.addEventListener("click", onClicked);

function onClicked() {
  console.log("clicked");
  myModal.classList.remove("modal-hidden");
}

myCancelButton.addEventListener("click", onCancel);
function onCancel() {
  console.log("cancel clicked");
  myModal.classList.add("modal-hidden");
}
