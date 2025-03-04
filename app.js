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

