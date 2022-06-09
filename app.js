const numberkeys = document.querySelectorAll('#number');
const displaynums = document.querySelector('.display h1');
const calcbtn = document.querySelectorAll('#number ,#operation');
const deletebtn = document.querySelector('#clear');
const backspcbtn = document.querySelector('#backspace');

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(currentOperation, num1, num2) {
  switch (currentOperation) {
    case 'addition':
      add(num1, num2);
      break;
    case 'subtraction':
      subtract(num1, num2);
      break;
    case 'multiplication':
      multiply(num1, num2);
      break;
    case 'division':
      divide(num1, num2);
      break;
  }
}

function displayChars() {
  calcbtn.forEach((key) => {
    key.addEventListener('click', () => {
      displayNumber(key.textContent);
    });
  });
}

function displayNumber(displayValue) {
  if (isNaN(displayValue)) {
    displaynums.textContent += ' ' + displayValue + ' ';
  } else {
    displaynums.textContent += displayValue;
  }
}

function deleteNum() {
  deletebtn.addEventListener('click', () => {
    displaynums.textContent = '';
  });
}

function backspace() {
  backspcbtn.addEventListener('click', () => {
    displaynums.textContent = displaynums.textContent.slice(
      0,
      displaynums.textContent.length - 1
    );
  });
}

displayChars();
deleteNum();
backspace();
