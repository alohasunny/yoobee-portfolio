function fillAccomCard() {
  const meal = userInputs.meal
    ? capitalizeFirstLetter(userInputs.meal)
    : "No meals";
  const totalMealPrice = calculateMealTotal();
  const totalAccomPrice =
    accommodations[userInputs.accom].price * userInputs.nightCount;

  const confirmedDetailsArr = document.querySelectorAll(".confirmed-details");
  const bookingSummaryArr = document.querySelectorAll(".booking-summary");
  const paymentSection = document.querySelector("#payment");

  confirmedDetailsArr.forEach((detailsEle) => {
    detailsEle
      .querySelector("img")
      .setAttribute(
        "src",
        `./assets/${accommodations[userInputs.accom].image}`
      );

    detailsEle.querySelector(".accom-name").innerHTML =
      accommodations[userInputs.accom].name;

    detailsEle.querySelector(".accom-address").innerHTML =
      accommodations[userInputs.accom].address;
  });

  bookingSummaryArr.forEach((bookingEle) => {
    bookingEle.querySelector(".night-guest").innerHTML = `${
      userInputs.nightCount
    } ${pluralize(userInputs.guestCount, "night")}, ${
      userInputs.guestCount
    } ${pluralize(userInputs.guestCount, "guest")}
      `;

    bookingEle.querySelector(
      ".acc-total-price"
    ).innerHTML = `NZ $${totalAccomPrice}`;

    bookingEle.querySelector(".meal-name").innerHTML = meal;

    bookingEle.querySelector(
      ".meal-total-price"
    ).innerHTML = `NZ $${totalMealPrice}`;

    bookingEle.querySelector(".final-price").innerHTML = `NZ $${
      totalMealPrice + totalAccomPrice
    }`;
  });

  paymentSection.querySelector(".checkin-date").innerHTML =
    createLongDateString(userInputs.startDate);
  paymentSection.querySelector(".checkout-date").innerHTML =
    createLongDateString(userInputs.endDate);
}

document.querySelector("#return-home-btn").addEventListener("click", () => {
  changeToSection(indexSection);
  changeToNav(indexNav);
  resetFilterCheckboxes();
  clearAccomResults();

  userInputs.accom = null;
  userInputs.meal = null;
});
