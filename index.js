
let displayScreen = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.row button');
let operationScreen = document.getElementById('operation-screen')
const clearBtn = document.getElementById('clear');

let calculation = new Array();
calculation[0] = '';
calculation[1] = '';
let opClicked = false;
let currentSolution;
let currentOp;


buttons.forEach(button => {
    button.onclick = (e) => {
        const number = e.target.dataset.number
        const op = e.target.dataset.operator
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
                calculation[0] += number
                displayScreen.textContent =  calculation[0]
            }else{
                if(!op){
                    calculation[1] += number;
                    displayScreen.textContent =  calculation[1]
                }
            }
            // If an operator was chosen and there is a second number, perform the operation depending on the operator that was clicked and store the value in a variable.
            // Update the values of variables
            if(op && calculation[1] !== ''){
                performOperation(currentOp, calculation[0], calculation[1]);
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
})

function clear(){
    displayScreen.textContent = '0';
    calculation[0] = '';
    calculation[1] = '';
    currentOp = '';
    opClicked = false;
    currentSolution = '';
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