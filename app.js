const INITIAL_VALUE = "0";
const EMPTY_STRING = "";
const MAX_NUMBER_LENGTH = 9;

let number1 = "";
let number2 = "";
let selectedOperator = "";
let isFirstNumber = true;
let isInitialClick = true;



const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const result = document.querySelector(".result");
const clearButton = document.querySelector(".clearButton");
const resultButton = document.querySelector(".resultButton");
const decimalButton = document.querySelector(".decimalButton");

function add(...numbers) {
    return numbers.reduce((sum, number) => {
        return sum + number;
    })
}

function subtract(...numbers) {
    return numbers.reduce((sum, number) => {
        return sum - number;
    })
}

function multiply(...numbers) {
    return numbers.reduce((sum, number) => {
        return sum * number;
    })
}

function divide(...numbers) {
    return numbers.reduce((sum, number) => {
        return sum / number;
    })
}

function operate(operator, firstNum, lastNum) {
    switch (operator) {
        case '+':
            return add(firstNum, lastNum);
        case '-':
            return subtract(firstNum, lastNum);
        case '*':
            return multiply(firstNum, lastNum);
        case '/':
            return divide(firstNum, lastNum);
        default:
            return add(firstNum, lastNum);
    }
}




function updateInputText() {
    result.innerText = `${number1} ${selectedOperator} ${number2}`
}

function clearAllData() {
    result.innerText = INITIAL_VALUE;
    number1 = EMPTY_STRING;
    number2 = EMPTY_STRING;
    selectedOperator = EMPTY_STRING;
    isInitialClick = true;
    isFirstNumber = true;

}

function roundDecimal(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

function strToNumber(num) {
    let strNum = num.toString();
    if (strNum.includes(".")) return parseFloat(roundDecimal(strNum, 4));
    return parseInt(strNum);
}

//User can only use one decimal separator per number
function shouldDisableDecimal(num) {
    num.includes(".") ? decimalButton.disabled = true : decimalButton.disabled = false;
}


numbers.forEach(element => {
    element.addEventListener("click", () => {
        if (isInitialClick) {
            clearAllData();
            isInitialClick = false;
        }
        if (isFirstNumber && number1.length < MAX_NUMBER_LENGTH) {

            number1 += element.innerText;
            shouldDisableDecimal(number1);

        }
        else if (!isFirstNumber && number2.length < MAX_NUMBER_LENGTH) {
            number2 += element.innerText;
            shouldDisableDecimal(number2);


        }
        updateInputText();

    })
})



operators.forEach(element => {
    element.addEventListener("click", () => {
        if (!number1) return;

        isInitialClick = false;
        if (number1 && number2) {
            let newResult = operate(selectedOperator, strToNumber(number1), strToNumber(number2));
            number1 = newResult;
            number2 = "";
            selectedOperator = element.innerText;
            result.innerText = `${number1} ${selectedOperator}`;

        }
        else {
            selectedOperator = element.innerText;
            updateInputText();

        }


        isFirstNumber = false;
    })
})

resultButton.addEventListener("click", () => {
    if (!number1 || !selectedOperator || !number2) return;

    if (selectedOperator == "/" && number2 == 0) {
        alert(`You cant divide ${number1} to 0`);
        clearAllData();
        return;
    }
    let operationResult = operate(selectedOperator, strToNumber(number1), strToNumber(number2));
    result.innerText = operationResult;
    number1 = operationResult;
    number2 = EMPTY_STRING;
    selectedOperator = EMPTY_STRING;
    isFirstNumber = true;
    isInitialClick = true;

})

clearButton.addEventListener("click", clearAllData)

window.addEventListener("load", () => {
    result.innerText = INITIAL_VALUE;

})

