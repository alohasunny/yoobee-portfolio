// Form

let isFormComplete = false;
const bookingButton = document.querySelector("#book-btn");

const bookingObject = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  paymentFirstName: "",
  paymentLastName: "",
  ccNumber: "",
  ccDate: "",
  cvc: "",
};

document.querySelector("#first-name").addEventListener("blur", (e) => {
  bookingObject.firstName = e.target.value;
  checkBookingObjectForEmpty();
});
document.querySelector("#last-name").addEventListener("blur", (e) => {
  bookingObject.lastName = e.target.value;
  checkBookingObjectForEmpty();
});

document.querySelector("#phone").addEventListener("blur", (e) => {
  bookingObject.phone = e.target.value;
  checkBookingObjectForEmpty();
});

document.querySelector("#email").addEventListener("blur", (e) => {
  removeErrorMessages();
  if (isValidEmail(e.target.value)) {
    bookingObject.email = e.target.value;
    checkBookingObjectForEmpty();
  } else {
    bookingObject.email = "";
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = "Please enter a valid email address.";
    errorMessage.classList.add("error-message");
    e.target.after(errorMessage);
  }
});
document.querySelector("#payment-first-name").addEventListener("blur", (e) => {
  bookingObject.paymentFirstName = e.target.value;
  checkBookingObjectForEmpty();
});
document.querySelector("#payment-last-name").addEventListener("blur", (e) => {
  bookingObject.paymentLastName = e.target.value;
  checkBookingObjectForEmpty();
});

document.querySelector("#ccn").addEventListener("blur", (e) => {
  bookingObject.ccNumber = e.target.value;
  checkBookingObjectForEmpty();
});

document.querySelector("#inputExpDate").addEventListener("blur", (e) => {
  bookingObject.ccDate = e.target.value;
  checkBookingObjectForEmpty();
});
document.querySelector("#cvc").addEventListener("blur", (e) => {
  bookingObject.cvc = e.target.value;
  checkBookingObjectForEmpty();
});

function checkBookingObjectForEmpty() {
  for (let i in bookingObject) {
    if (!bookingObject[i]) {
      isFormComplete = false;
      toggleDisable();
      return;
    }
  }
  isFormComplete = true;
  toggleDisable();
}

function toggleDisable() {
  const submitButton = document.querySelector("#book-btn");
  const isBookingDisabled = submitButton.classList.contains("disabled");

  if (isFormComplete && isBookingDisabled) {
    submitButton.classList.remove("disabled");
  } else if (!isFormComplete) {
    submitButton.classList.add("disabled");
  }
}

// --- Navigation ----
// Payments to Confirmation
bookingButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest("form").checkValidity()) {
    changeToSection(confirmationSection);
    changeToNav(confirmationNav);
    window.scrollTo(0, 0);
  }
});

const cleaveCC = new Cleave(".ccFormatMonitor", {
  creditCard: true,
});

const cleaveExpiry = new Cleave("#inputExpDate", {
  date: true,
  datePattern: ["m", "y"],
});

const cleave = new Cleave("#phone", {
  phone: true,
  phoneRegionCode: "NZ",
});

const cleaveCVC = new Cleave(".cvc", {
  blocks: [3],
  uppercase: true,
});

function calculateMealTotal() {
  if (userInputs.meal == null) {
    return 0;
  } else if (userInputs.meal == "breakfast") {
    return userInputs.nightCount * userInputs.guestCount * 20;
  } else if (userInputs.meal == "lunch") {
    return userInputs.nightCount * userInputs.guestCount * 25;
  } else if (userInputs.meal == "dinner") {
    return userInputs.nightCount * userInputs.guestCount * 30;
  }
}
