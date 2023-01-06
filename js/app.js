//Color Change
getComputedStyle(document.documentElement).getPropertyValue("--primary-light");
getComputedStyle(document.documentElement).getPropertyValue("--primary");
getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");
getComputedStyle(document.documentElement).getPropertyValue("--white");
getComputedStyle(document.documentElement).getPropertyValue("--greyLight-1");
getComputedStyle(document.documentElement).getPropertyValue("--greyLight-2");
getComputedStyle(document.documentElement).getPropertyValue("--background-color");
getComputedStyle(document.documentElement).getPropertyValue("--greyDark");

const colorChange = () => {
  if (result.value > 0) {
    // Green Color Change
    document.documentElement.style.setProperty("--primary-light", "#42aa34");
    document.documentElement.style.setProperty("--primary", "#157508");
    document.documentElement.style.setProperty("--primary-dark", "#42a534");
  } else if (result.value == 0) {
    // Blue Color Change
    document.documentElement.style.setProperty("--primary-light", "#8abdff");
    document.documentElement.style.setProperty("--primary", "#6d5dfc");
    document.documentElement.style.setProperty("--primary-dark", "#5b0eeb");
  } else {
    // Red Color Change
    document.documentElement.style.setProperty("--primary-light", "#f16767");
    document.documentElement.style.setProperty("--primary", "#e61717");
    document.documentElement.style.setProperty("--primary-dark", "#ff3636");
  }
};

// Calculator Function
let result = document.getElementById("result");
result.value = "0";
const colors = document.querySelector("symbol");
let firstNumber = document.getElementById("first-number");
let secondNumber = document.getElementById("second-number");
let operation = document.getElementById("operation");
const deleteChar = document.querySelector("i");
const buttonPressed = document.querySelectorAll("button");
const switchButton = document.getElementById("switch");
const activateDarkMode = document.getElementById("toggleDarkMode");
let stateText = document.getElementById("modeState");

function sum(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

// This button remove incoming last number
deleteChar.onclick = () => {
  data = result.value;
  result.value = data.substr(0, data.length - 1);
  if (result.value == "") {
    result.value = "0";
    if (
      (result.value == "0" && firstNumber.value == "") ||
      (result.value == "0" &&
        firstNumber.value != "" &&
        secondNumber.value != "")
    ) {
      firstNumber.value = "";
      secondNumber.value = "";
      operation.value = "";
      colorChange();
    }
  }
};

// Global event listener for all buttons
buttonPressed.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent == "CE") {
      result.value = 0;
      firstNumber.value = "";
      secondNumber.value = "";
      operation.value = "";
      colorChange();
    } else if (
      button.textContent == "+" ||
      button.textContent == "-" ||
      button.textContent == "x" ||
      button.textContent == "÷"
    ) {
      if (operation.value == "") {
        operation.value = button.textContent;
        firstNumber.value = result.value;
        result.value = 0;
      } else if (firstNumber.value != "" && secondNumber.value != "") {
        operation.value = button.textContent;
        firstNumber.value = result.value;
        secondNumber.value = "";
        result.value = 0;
        colorChange();
      } else {
        operation.value = button.textContent;
      }
    } else if (button.textContent == "=") {
      secondNumber.value = result.value;
      if (operation.value == "+") {
        result.value = sum(
          Number(firstNumber.value),
          Number(secondNumber.value)
        );
        colorChange();
      } else if (operation.value == "-") {
        result.value = substract(
          Number(firstNumber.value),
          Number(secondNumber.value)
        );
        colorChange();
      } else if (operation.value == "x") {
        result.value = multiply(
          Number(firstNumber.value),
          Number(secondNumber.value)
        );
        colorChange();
      } else {
        result.value = divide(
          Number(firstNumber.value),
          Number(secondNumber.value)
        );
        colorChange();
      }
    } else {
      if (result.value == "0") {
        result.value = "";
        result.value += button.textContent;
      } else {
        result.value += button.textContent;
      }
    }
  });
});

// Dark Mode
activateDarkMode.onclick = () => {
  if (!switchButton.classList.contains("darkModeActive")) {
    switchButton.classList.add("darkModeActive");
    switchButton.classList.remove("switch");
    stateText.innerHTML = "Dark Mode On";
    document.documentElement.style.setProperty("--white", "#717171");
    document.documentElement.style.setProperty("--greyLight-1", "#b1b1b1");
    document.documentElement.style.setProperty("--greyLight-2", "#000");
    document.documentElement.style.setProperty("--background-color", "#151516");
    document.documentElement.style.setProperty("--greyDark", "#fff");
  } else {
    switchButton.classList.remove("darkModeActive");
    switchButton.classList.add("switch");
    stateText.innerHTML = "Light Mode On";
    document.documentElement.style.setProperty("--white", "#fff");
    document.documentElement.style.setProperty("--greyLight-1", "#e4ebf5");
    document.documentElement.style.setProperty("--greyLight-2", "#c8d0e7");
    document.documentElement.style.setProperty("--background-color", "#fff");
    document.documentElement.style.setProperty("--greyDark", "#848ea8");
  }
};