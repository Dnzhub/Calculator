const INITIAL_VALUE = "0";
const EMPTY_STRING = "";
const MAX_NUMBER_LENGTH = 9;

let number1 = "";
let number2 = "";
let selectedOperator = "";
let isFirstNumber = true;
let isInitialClick = true;
let operatorSymbols = ["+", "-", "*", "/"];


const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const result = document.querySelector(".result");
const clearButton = document.querySelector(".clearButton");
const resultButton = document.querySelector(".resultButton");
const decimalButton = document.querySelector(".decimalButton");
const removeKeyButton = document.querySelector(".CEButton");
const signButton = document.querySelector(".signButton");

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
    if (strNum.includes(".")) return parseFloat(roundDecimal(strNum, 2));
    return parseInt(strNum);
}

//User can only use one decimal separator per number
function shouldDisableDecimal(num, key) {
    if (num.includes(".") && key == ".") return true;
    return false;
}

function disableDecimal(disabled) {
    decimalButton.disabled = disabled;
}

//Error handler when user try divide a number to zero
function isDivideByZero() {
    if (selectedOperator == "/" && number2 == 0) {
        alert(`You cant divide ${number1} to 0`);
        clearAllData();
        return true;
    }
    return false;
}


function calculateResult() {
    if (!number1 || !selectedOperator || !number2) return;

    if (isDivideByZero()) return;
    let operationResult = operate(selectedOperator, strToNumber(number1), strToNumber(number2)).toFixed(2);

    result.innerText = operationResult;

    number1 = operationResult;
    number2 = EMPTY_STRING;
    selectedOperator = EMPTY_STRING;
    isFirstNumber = true;
    isInitialClick = true;
}

function attachNumber(element) {
    if (isInitialClick) {
        clearAllData();
        isInitialClick = false;
    }
    if (isFirstNumber && number1.length < MAX_NUMBER_LENGTH) {

        if (shouldDisableDecimal(number1, element)) return;
        number1 += element;

    }
    else if (!isFirstNumber && number2.length < MAX_NUMBER_LENGTH) {
        if (shouldDisableDecimal(number2, element)) return;
        number2 += element;


    }
    updateInputText();
}

function attachOperator(element) {
    if (!number1) return;

    isInitialClick = false;
    if (number1 && number2) {
        let newResult = operate(selectedOperator, strToNumber(number1), strToNumber(number2));
        number1 = newResult;
        number2 = "";
        selectedOperator = element;
        result.innerText = `${number1} ${selectedOperator}`;

    }
    else {
        selectedOperator = element;;
        updateInputText();


    }

    isFirstNumber = false;
    disableDecimal(false);
}

function removeKey() {
    if (number2) {
        number2 = number2.toString().replace(/.$/, "")

    }
    else if (selectedOperator) {
        selectedOperator = EMPTY_STRING;
    }
    else {

        number1 = number1.toString().replace(/.$/, "")
    }

}


function changeSign() {
    if (isFirstNumber) {
        let num = strToNumber(number1);
        number1 = num *= -1;
        number1 = number1.toString();

    }
    else {
        let num = strToNumber(number2);
        number2 = num *= -1;
        number2 = number2.toString();
    }
    updateInputText();
}

numbers.forEach(element => {
    element.addEventListener("click", () => {
        attachNumber(element.innerText);
    })

})



operators.forEach(element => {
    element.addEventListener("click", () => {
        attachOperator(element.innerText);
    })
})

resultButton.addEventListener("click", calculateResult)

document.addEventListener("keydown", (e) => {

    const isNumberKey = !isNaN(e.key) || e.key === ".";
    const isOperatorKey = operatorSymbols.includes(e.key);
    const isResultKey = e.key === "Enter";
    const isRemoveKey = e.key === "Backspace";

    if (isNumberKey) {
        attachNumber(e.key);
    }
    if (isOperatorKey) {
        attachOperator(e.key);
    }
    if (isResultKey) {
        calculateResult();
    }
    if (isRemoveKey) {
        removeKey();
    }

    updateInputText();

})
clearButton.addEventListener("click", () => {
    clearAllData()
    disableDecimal(false);
})

removeKeyButton.addEventListener("click", () => {
    removeKey();
    updateInputText();
});

signButton.addEventListener("click", changeSign);

window.addEventListener("load", () => {
    result.innerText = INITIAL_VALUE;

})

