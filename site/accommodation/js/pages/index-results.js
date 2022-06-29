// ----- Navigation -----
// index to results
document.querySelector("#search-btn").addEventListener("click", (e) => {
  removeErrorMessages();
  if (isValidDates()) {
    changeToSection(resultsSection);
    changeToNav(resultsNav);

    addAllAccoms(accommodations);
    removeWrongAccomms();

    addCheckboxFilterListener();
    addDetailsListener();
  } else {
    const datesInput = document.querySelector(".dates-input");
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = "Please enter a check-in and check-out date";
    errorMessage.classList.add("error-message");
    datesInput.after(errorMessage);
  }
});

function removeErrorMessages() {
  document.querySelectorAll(".error-message").forEach((ele) => {
    hideEle(ele);
  });
}

function isValidDates() {
  return userInputs.nightCount > 0;
}

// ----- Search Criteria -----

// Dates
const picker = new Litepicker({
  format: "DD-MM-YYYY",
  minDate: Date.now(),

  element: document.getElementById("start-date"),
  elementEnd: document.getElementById("end-date"),
  singleMode: false,
  allowRepick: true,
  maxDays: 15,
  plugins: ["mobilefriendly"],
});

picker.on("selected", (date1, date2) => {
  removeErrorMessages();
  userInputs.startDate = date1;
  userInputs.endDate = date2;

  // night count
  const theRangeInMillseconds = date2.dateInstance - date1.dateInstance;
  const numberOfMillsecondsInDay = 86400000;
  const nightsCounter = theRangeInMillseconds / numberOfMillsecondsInDay;
  userInputs.nightCount = nightsCounter;

  updateIndexUI();
  updateNavUI();
});

function updateIndexUI() {
  const formattingOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  document.querySelector("#start-date").innerHTML =
    userInputs.startDate.dateInstance.toLocaleDateString(
      "en-NZ",
      formattingOptions
    );
  document.querySelector("#end-date").innerHTML =
    userInputs.endDate.dateInstance.toLocaleDateString(
      "en-NZ",
      formattingOptions
    );
}

function updateNavUI() {
  const navDatesEle = document.querySelector(".selected-dates");

  navDatesEle.innerHTML = createDateRangeString();
}

// Guest Count
const guestSelectArr = document.querySelectorAll(".guest-num");
for (let i = 0; i < guestSelectArr.length; i++) {
  guestSelectArr[i].addEventListener("change", (event) => {
    userInputs.guestCount = event.target.value;
    document.querySelector(".selected-guests").innerHTML =
      userInputs.guestCount + " " + pluralize(userInputs.guestCount, "guest");
  });
}

//  ----- Search Results ----

function addAllAccoms(obj) {
  let html = "";
  for (accom in obj) {
    html += `
    <div class="accom-card a-result ${
      obj[accom].type
    }" data-accom="${accom}" data-type="${obj[accom].type}">
      <img src="./assets/${obj[accom].image}" />
      <div class="accom-details">
        <div class="accom-name">${obj[accom].name}</div>
        <div class="flex space-between items-center">
          <div class="prices">
            <div class="night-price"">$${obj[accom].price}/night</div>
            <div class="total-price" data-total="${
              obj[accom].price * userInputs.nightCount
            }">$${obj[accom].price * userInputs.nightCount} total</div>
          </div>
          <div class="details-button btn btn-sm">View Details</div>
        </div>
      </div>
    </div>`;
  }

  document.querySelector(".accom-wrapper").innerHTML += html;
}

// ------- Accommodation Filtering by search ---------

function removeWrongAccomms() {
  if (userInputs.guestCount == 1) {
    removeAccomType("motel");
    disableFilterCheckbox("motel");
  } else if (userInputs.guestCount == 2) {
    removeAccomType("hostel");
    disableFilterCheckbox("hostel");
  } else if (userInputs.guestCount == 3 || userInputs.guestCount == 4) {
    removeAccomType("hotel");
    removeAccomType("hostel");
    disableFilterCheckbox("hotel");
    disableFilterCheckbox("hostel");
  }

  if (userInputs.nightCount > 5) {
    removeAccomType("hotel");
    disableFilterCheckbox("hotel");
  }
  if (userInputs.nightCount > 10) {
    removeAccomType("hostel");
    disableFilterCheckbox("hostel");
  }
  if (userInputs.nightCount > 10 || userInputs.nightCount < 3) {
    removeAccomType("motel");
    disableFilterCheckbox("motel");
  }
  if (userInputs.nightCount > 15 || userInputs.nightCount < 2) {
    removeAccomType("house");
    disableFilterCheckbox("house");
  }
}

function removeAccomType(type) {
  const accommodations = document.querySelectorAll("." + type);
  for (let i = 0; i < accommodations.length; i++) {
    hideEle(accommodations[i]);
  }
}

function disableFilterCheckbox(type) {
  const checkbox = document.querySelector(
    `.type-checkbox input[data-term='${type}`
  );
  checkbox.disabled = true;
  checkbox.checked = false;
}

// ------ Accommodation Filter Checkboxes
function addCheckboxFilterListener() {
  const accomArray = document.querySelectorAll(".a-result");
  const checkboxArray = document.querySelectorAll(`.type-checkbox input`);

  for (let i = 0; i < checkboxArray.length; i++) {
    const checkbox = checkboxArray[i];

    checkbox.addEventListener("change", (event) => {
      const searchTerm = event.target.getAttribute("data-term");
      for (let j = 0; j < accomArray.length; j++) {
        const currentAccom = accomArray[j];
        const currentType = currentAccom.getAttribute("data-type");
        if (currentType.includes(searchTerm) && checkbox.checked) {
          currentAccom.style.display = "block";
        } else if (currentType.includes(searchTerm) && !checkbox.checked) {
          currentAccom.style.display = "none";
        }
      }
    });
  }
}

function clearAccomResults() {
  document.querySelector(".accom-wrapper").innerHTML = "";
  resetFilterCheckboxes();
}

function resetFilterCheckboxes() {
  const checkboxes = document.querySelectorAll(`.type-checkbox input`);

  checkboxes.forEach((checkbox) => {
    checkbox.disabled = false;
    checkbox.checked = true;
  });
}
