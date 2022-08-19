
let displayScreen = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.row button');
let operationScreen = document.getElementById('operation-screen');
const clearBtn = document.getElementById('clear');
const pointBtn = document.getElementById('point');
const deleteBtn = document.getElementById('delete');

let calculation = new Array();
calculation[0] = 0;
calculation[1] = '';
let opClicked = false;
let currentSolution;
let currentOp;


buttons.forEach(button => {
    button.onclick = (e) => {
        const number = e.target.dataset.number
        const op = e.target.dataset.operator
       calculate(number, op)
    }
})

function keyboardCalculation(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    let op;
    let number;

    if(e.shiftKey && e.keyCode === 56){
        op = 'x';
        number += '';
    }
    if(key){
        if(key.dataset.operator){
            op = key.dataset.operator
        } else if(key.dataset.number){
            number = key.dataset.number
        }
        calculate(number, op)
    }
}

window.addEventListener('keydown', keyboardCalculation)

function calculate(number, op){

    displayScreen.textContent = number ? `${number}` : `${calculation[0]}`

    // Error checking
    if(op === '=' && (calculation[0] === '' || calculation[1] === '')){
        displayScreen.textContent = 'Syntax Error!'
    } else if(currentOp === '÷' && calculation[1] === '0'){
        displayScreen.textContent = 'Cannot divide by 0!'
    } else {
        // If an operator was chosen and it wasnt equals and there is no second number, make opClicked true and store the current operator chosen
        if(op && op != '=' && !calculation[1]){
            opClicked = true;
            currentOp = op;
        }
        // If an operator has not been clicked yet, store the numbers inputed as the first number
        // Else  if opClicked = true and no operator has been clicked, store any number after that as the second number
        if(!opClicked){
            if(calculation[0] === 0){
                calculation[0] = '';
                calculation[0] += number
            } else {
                calculation[0] += number
            }
            if(calculation[0].includes('.')){
                pointBtn.disabled = true;
            }
            displayScreen.textContent =  calculation[0]
        } else {
            operationScreen.textContent = op ? `${calculation[0]} ${op}` : `${calculation[0]} ${currentOp}`
            if(!op){
                pointBtn.disabled = false;
                calculation[1] += number;
                if(calculation[1].includes('.')){
                    pointBtn.disabled = true;
                }
                displayScreen.textContent =  calculation[1]
            }
        }
        // If an operator was chosen and there is a second number, perform the operation depending on the operator that was clicked and store the value in a variable.
        // Update the values of variables
        if(op && calculation[1] !== ''){
            performOperation(currentOp, calculation[0], calculation[1]);

            if(op === '='){
                operationScreen.textContent = `${calculation[0]} ${currentOp}  ${calculation[1]}  ${op}`
            } else {
                operationScreen.textContent = `${roundSolution(currentSolution)} ${op}`
            }

            currentOp = op;
            displayScreen.textContent = `${roundSolution(currentSolution)}`;
            calculation[0] = roundSolution(currentSolution);
            calculation[1] = '';
        }
    }
    clearBtn.onclick = () => {
        clear();
    }
}


function clear(){
    displayScreen.textContent = '0';
    operationScreen.textContent = '';
    calculation[0] = 0;
    calculation[1] = '';
    currentOp = '';
    opClicked = false;
    currentSolution = '';
    pointBtn.disabled = false;
}

function performOperation(operation, a, b){
    if(operation === '-'){
        currentSolution = operate(subtract, a, b);
    } else if(operation === 'x'){
        currentSolution = operate(multiply, a, b)
    } else if(operation === '÷'){
        currentSolution = operate(divide, a, b)
    } else if(operation === '+'){
        currentSolution = operate(add, a, b)
    }
}

function roundSolution(n){
    return Math.round(n * 100) / 100;
}

function operate(operator,a,b){
    return operator(a,b);
}

function add(a,b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}