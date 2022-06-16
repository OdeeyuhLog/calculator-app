const btns = document.querySelectorAll('.buttons button');
const mainDisplay = document.querySelector('.display h1');
const prevDisplay = document.querySelector('.display p');
const backspaceBtn = document.getElementById('backspace');

let inputValue = null;
let firstNum = null;
let secondNum = null;
let currentOperator = null;
let prevOperator = null;

// For computations
function add(num1, num2) {
  return Number(num1 + num2);
}

function subtract(num1, num2) {
  return Number(num1 - num2);
}

function multiply(num1, num2) {
  return Number(num1 * num2);
}

function divide(num1, num2) {
  return Number(num1 / num2);
}

// Main computation function; accept two number values and the desired operation.
function operate(currentOperation, num1, num2) {
  let result;
  switch (currentOperation) {
    case 'addition':
      result = add(num1, num2);
      break;
    case 'subtraction':
      result = subtract(num1, num2);
      break;
    case 'multiplication':
      result = multiply(num1, num2);
      break;
    case 'division':
      result = divide(num1, num2);
      break;
  }

  result = roundValue(result);

  return parseFloat(result);
}

// Evaluate if a decimal, if yes, round to two decimal places.
function roundValue(value) {
  let result = value - Math.floor(value) !== 0;

  if (result) {
    return parseFloat(value.toFixed(2));
  } else {
    return value;
  }
}

// Updates the display
function showDisplay() {
  if (inputValue.length === 10) {
    mainDisplay.textContent = inputValue.substring(0, 10);
  }
  mainDisplay.innerText = inputValue;
}

// Activate the corresponding function according to the pressed button.
function pressButton() {
  btns.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        displayNumbers(button.dataset.value);
        showDisplay();
      } else if (button.classList.contains('operation')) {
        chooseOperator(button.dataset.operation);
      } else if (button.classList.contains('equals')) {
        inputAnswer();
        showDisplay();
      } else if (button.classList.contains('backspace')) {
        backspace();
        showDisplay();
      } else if (button.classList.contains('clear')) {
        clearData();
        showDisplay();
      } else if (button.classList.contains('negative')) {
        turnNegative();
        showDisplay();
      }
    });
  });
}
pressButton();

// Evaluate the current conditions and how the numbers will be displayed properly
function displayNumbers(number) {
  if (currentOperator === null) {
    if (inputValue === null) {
      inputValue = number;
    } else {
      inputValue += number;
    }
  } else {
    if (inputValue === firstNum) {
      inputValue = number;
    } else {
      inputValue += number;
    }
  }
}

// Process the chosen operator
function chooseOperator(operator) {
  if (currentOperator === null && prevOperator === null) {
    currentOperator = operator;
    firstNum = inputValue;
  } else if (currentOperator != null && prevOperator === null) {
    inputAnswer();
    showDisplay();
    secondNum = null;
    firstNum = inputValue;
    prevOperator = currentOperator;
    currentOperator = operator;
  } else if (currentOperator != null && prevOperator != null) {
    inputAnswer();
    showDisplay();
    secondNum = null;
    firstNum = inputValue;
    prevOperator = currentOperator;
    currentOperator = operator;
  }
}

// Function that displays the answer and its corresponding equation.
function inputAnswer() {
  secondNum = inputValue;

  let result = operate(currentOperator, Number(firstNum), Number(secondNum));
  let operator;
  switch (currentOperator) {
    case 'addition':
      operator = '+';
      break;
    case 'subtraction':
      operator = '-';
      break;
    case 'multiplication':
      operator = 'x';
      break;
    case 'division':
      operator = '/';
      break;
  }
  prevDisplay.textContent = `${firstNum} ${operator} ${secondNum} =`;
  inputValue = result;
}

// Backspace feature
function backspace() {
  inputValue = inputValue.slice(0, inputValue.length - 1);
}

// Reset feature
function clearData() {
  inputValue = null;
  currentOperator = null;
  prevOperator = null;
  firstNum = null;
  secondNum = null;
  prevDisplay.textContent = '';
  mainDisplay.textContent = null;
}

// Allows user to input negative integers
function turnNegative() {
  inputValue = inputValue * -1;
}
