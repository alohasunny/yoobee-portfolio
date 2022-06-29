const indexSection = "index";
const resultsSection = "search-results";
const detailsSection = "accom-details";
const paymentSection = "payment";
const confirmationSection = "confirmation";

const indexNav = "index-nav";
const resultsNav = "selection-nav";
const detailsNav = "details-nav";
const paymentNav = "payment-nav";
const confirmationNav = "confirmation-nav";

let currentSection = "index";

// ------  Back Arrow --------
const backArrowsArr = document.querySelectorAll(".back-arrow");

for (backArrow of backArrowsArr) {
  backArrow.addEventListener("click", () => {
    if (currentSection === resultsSection) {
      changeToSection(indexSection);
      changeToNav(indexNav);
      clearAccomResults();
    } else if (currentSection === detailsSection) {
      changeToSection(resultsSection);
      changeToNav(resultsNav);
    } else if (currentSection === paymentSection) {
      changeToSection(detailsSection);
      changeToNav(detailsNav);
    }
  });
}

function changeToSection(sectionName) {
  currentSection = sectionName;
  changeTo(sectionName, "section");
}

function changeToNav(navName) {
  changeTo(navName, "nav");
}

function changeTo(changeToName, eleType) {
  const eleTypesArr = document.querySelectorAll(eleType);
  for (ele of eleTypesArr) {
    hideEle(ele);
  }

  showEle(document.querySelector("#" + changeToName));
}

function hideEle(ele) {
  ele.classList.add("hidden");
}

function showEle(ele) {
  ele.classList.remove("hidden");
}
