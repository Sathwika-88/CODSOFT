// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display1');
    const buttons = document.querySelectorAll('.b1');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                evaluate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                chooseOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        display1.innerText = '0';
    }

    function appendNumber(number) {
        if (shouldResetScreen) resetScreen();
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        display.innerText = currentInput;
    }

    function resetScreen() {
        currentInput = '';
        shouldResetScreen = false;
    }

    function chooseOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') evaluate();
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        shouldResetScreen = true;
    }

    function evaluate() {
        if (currentInput === '' || previousInput === '' || operator === '') return;
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    alert("Cannot divide by 0");
                    clear();
                    return;
                }
                result = a / b;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        display1.innerText = currentInput;
        operator = '';
        previousInput = '';
        shouldResetScreen = true;
    }
});
