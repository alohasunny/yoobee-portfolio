function pluralize(num, word) {
  // doesn't work for everything, but should work for days, guests, meals
  return num > 1 ? word + "s" : word;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//simple email string check
function isValidEmail(str) {
  return str.length > 5 && str.indexOf("@") > 0;
}
