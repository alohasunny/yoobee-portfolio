function addDetailsListener() {
  const details = document.querySelector(".details");

  const detailsButtons = document.querySelectorAll(".details-button");
  detailsButtons.forEach((detailsButton) => {
    detailsButton.addEventListener("click", (e) => {
      changeToSection(detailsSection);
      changeToNav(detailsNav);
      fillDetailsContent(e.target.closest(".accom-card"));
    });
  });

  document.querySelector("#meal-options").addEventListener("change", (e) => {
    userInputs.meal = e.target.value;
  });

  document.querySelector("#reserve-btn").addEventListener("click", () => {
    fillAccomCard();
    changeToSection(paymentSection);
    changeToNav(paymentNav);
  });

  function fillDetailsContent(accom) {
    userInputs.accom = accom.getAttribute("data-accom");

    details
      .querySelector("img")
      .setAttribute(
        "src",
        `./assets/${accommodations[userInputs.accom].image}`
      );
    details.querySelector(".accom-name").innerHTML =
      accommodations[userInputs.accom].name;
    details.querySelector(".accom-address").innerHTML =
      accommodations[userInputs.accom].address;
    details.querySelector(".booking-dates").innerHTML = createDateRangeString();
    details.querySelector(".guest-number").innerHTML =
      userInputs.guestCount + " " + pluralize(userInputs.guestCount, "guest");
    details.querySelector(".night-price").innerHTML = `$${
      accommodations[userInputs.accom].price
    }/night`;
    details.querySelector(".total-price").innerHTML = `$${
      accommodations[userInputs.accom].price * userInputs.nightCount
    } total`;
  }
}
