var myHamburger = document.querySelector(".hamburger");
var myMobileMenu = document.querySelector(".mobile-menu");

myHamburger.addEventListener("click", onHamburgerClicked);

function onHamburgerClicked() {
  console.log("onHamburgerClicked");
  myHamburger.classList.toggle("is-active");
  myMobileMenu.classList.toggle("show-mobile");
}
