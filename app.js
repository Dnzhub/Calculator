let number1 = 0;
let number2 = 0;
let selectedOperator = "";

function add(...numbers)
{
    return numbers.reduce((sum,number) => {
        return sum + number;
    })
}

function subtract(...numbers)
{
    return numbers.reduce((sum,number) => {
        return sum - number;
    })
}

function multiply(...numbers)
{
    return numbers.reduce((sum,number) => {
        return sum * number;
    })
}

function divide(...numbers)
{
    return numbers.reduce((sum,number) => {
        return sum / number;
    })
}

function operate(operator, firstNum, lastNum)
{
    switch (operator) {
        case '+':
            add(firstNum,lastNum);
            break;
        case '-':
            subtract(firstNum,lastNum);
            break;
        case '*':
            multiply(firstNum,lastNum);
            break;
        case '/':
            divide(firstNum,lastNum);
            break;
        default:
            break;
    }
}

