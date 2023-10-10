import "./style.css";

const pattern = {
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  zipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
};

const constraints = {
  ch: [
    "^(CH-)?\\d{4}$",
    "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
  ],
  fr: [
    "^(F-)?\\d{5}$",
    "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
  ],
  de: [
    "^(D-)?\\d{5}$",
    "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
  ],
  nl: [
    "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
    "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
  ],
};

const email = document.querySelector("input#email");
email.addEventListener("input", validateEmail);
const emailError = document.querySelector("input#email + .error");

function isInputEmail(target) {
  return pattern.email.test(target.value);
}

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty display the following error message.
    emailError.textContent = "You need to enter an Email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }

  emailError.className = "error active";
}

function validateEmail(e) {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
    return true;
  } else {
    showError();
  }
}

// Check if zip code match country
function checkZIP() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };
}

// Read the country id
const country = document.getElementById("country");
// Get the NPA field
const ZIPField = document.getElementById("ZIP");
const zipError = document.querySelector("input#ZIP + .error");

function showZipError(e) {
  if (ZIPField.validity.valueMissing) {
    // If the field is empty display the following error message.
    zipError.textContent = "You need to enter Zip code.";
  } else {
    zipError.textContent = constraints[country.value][1];
  }

  zipError.className = "error active";
}

// Check it!
function validateZipCode(e) {
  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(ZIPField.value)) {
    zipError.textContent = "";
    zipError.className = "error";
    return true;
  } else {
    showZipError();
  }
}

country.addEventListener("change", validateZipCode);
ZIPField.addEventListener("input", validateZipCode);

const password = document.querySelector("input#password");
const passwordError = document.querySelector("input#password + .error");
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

function showPasswordError(e) {
  if (password.validity.valueMissing) {
    // If the field is empty display the following error message.
    passwordError.textContent = "You need to enter password.";
  } else {
    passwordError.textContent =
      "minimal 8 digits, 1 uppercase letter, 1 lowercase letter, and 1 number.";
  }

  passwordError.className = "error active";
}

function validatePassword(e) {
  if (passwordPattern.test(password.value) && password.value.length >= 8) {
    passwordError.textContent = "";
    passwordError.className = "error";
    return true;
  } else {
    showPasswordError();
  }
}

password.addEventListener("input", validatePassword);

const passwordConfirmation = document.querySelector(
  "input#password-confirmation"
);
const passwordConfirmationError = document.querySelector(
  "input#password-confirmation + .error"
);

function showPasswordConfirmationError(e) {
  if (passwordConfirmation.validity.valueMissing) {
    // If the field is empty display the following error message.
    passwordConfirmation.textContent = "You need to enter password.";
  } else {
    passwordConfirmationError.textContent = "The password doesn't match";
  }

  passwordConfirmationError.className = "error active";
}

function validatePasswordConfirmation(e) {
  if (password.value === passwordConfirmation.value) {
    passwordConfirmationError.textContent = "";
    passwordConfirmationError.className = "error";
    return true;
  } else {
    showPasswordConfirmationError();
  }
}

passwordConfirmation.addEventListener("input", validatePasswordConfirmation);

// Submit form
const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  if (
    validateEmail(e) &&
    validateZipCode(e) &&
    validatePassword(e) &&
    validatePasswordConfirmation(e)
  ) {
    alert("Success, HIGH FIVE!!!");
  } else {
    validateEmail(e);
    validateZipCode(e);
    validatePassword(e);
    validatePasswordConfirmation(e);
  }
}
