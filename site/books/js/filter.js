// filter starts here
var allArray = document.querySelectorAll(".card");
var choicesArray = document.querySelectorAll("ul input");

for (var i = 0; i < choicesArray.length; i++) {
  var currentElement = choicesArray[i];
  currentElement.addEventListener("change", onUserChoice);
}

function onUserChoice(event) {
  var searchTerm = event.target.getAttribute("data-term");

  if (event.target.checked == true) {
    for (var i = 0; i < allArray.length; i++) {
      var currentElement = allArray[i];
      var currentFormat = currentElement.getAttribute("data-format");

      if (currentFormat.includes(searchTerm) == true) {
        currentElement.style.display = "flex";
      } else {
        currentElement.style.display = "none";
      }
    }
  }
}
