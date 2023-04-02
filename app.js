let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let form = document.querySelector("form");

let yearOutput = document.querySelector("#yearOutput");
let monthOutput = document.querySelector("#monthOutput");
let dayOutput = document.querySelector("#dayOutput");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let currentDay = date.getDate();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

function setError(element, message = "This field is required") {
  let formGroup = element.parentNode;
  let error = formGroup.querySelector(".error");
  formGroup.classList.add("error");
  error.innerText = message;
  resetOutput();
}
function setSuccess(element) {
  let formGroup = element.parentNode;
  if (formGroup.classList.contains("error")) {
    formGroup.classList.remove("error");
  }
}
const validateInputs = () => {
  const dayValue = day.value.trim();
  const monthValue = month.value.trim();
  const yearValue = year.value.trim();

  // check day for empty input
  if (dayValue === "" || dayValue === null) {
    setError(day);
    return;
    // check for invalid day
  } else if (dayValue > 31) {
    setError(day, "Must be a valid day");
    return;
    // check for february day
  } else if (monthValue == 2 && !checkLeapYear(yearValue) && dayValue > 28) {
    setError(day, "Must be a valid day");
    return;
    // check for months with max 30 days
  } else if (
    (monthValue == 4 ||
      monthValue == 6 ||
      monthValue == 9 ||
      monthValue == 11) &&
    dayValue > 30
  ) {
    setError(day, "Must be a valid day");
    return;
  } else {
    setSuccess(day);
  }

  if (yearValue === "" || yearValue === null) {
    setError(year);
    return;
  } else if (yearValue > currentYear) {
    setError(year, "Must be in the past");
    return;
  } else {
    setSuccess(year);
  }

  if (monthValue === "" || monthValue === null) {
    setError(month);
    return;
  } else if (monthValue > 12) {
    setError(month, "Must be a valid month");
    return;
  } else {
    setSuccess(month);
  }

  // get Year
  let yearAge = currentYear - yearValue;
  // get months
  if (currentMonth >= monthValue) {
    monthAge = currentMonth - monthValue;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - monthValue;
  }
  // get days
  if (currentDay >= dayValue) {
    dayAge = currentDay - dayValue;
  } else {
    monthAge--;
    if (monthValue == 2 && checkLeapYear(yearValue)) {
      dayAge = 29 + currentDay - dayValue;
    } else if (monthValue == 2 && checkLeapYear(yearValue)) {
      dayAge = 28 + currentDay - monthValue;
    } else if (
      monthValue == 4 ||
      monthValue == 6 ||
      monthValue == 9 ||
      monthValue == 11
    ) {
      dayAge = 30 + currentDay - dayValue;
    } else {
      dayAge = 31 + currentDay - dayValue;
    }
  }

  yearOutput.innerText = yearAge;
  monthOutput.innerText = monthAge;
  dayOutput.innerText = dayAge;
};
const checkLeapYear = (year) => {
  if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
    return true;
  }
};
function resetOutput() {
  yearOutput.innerText = "--";
  monthOutput.innerText = "--";
  dayOutput.innerText = "--";
}
