
let displayScreen = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.row button');

let currentTotal = 0;
let currentOperator;

function populateDisplay(){
    const array = new Array();
    let index;
    let num1;
    let num2;
    let currentOp;
    buttons.forEach(button => {
        button.onclick = (e) => {
            const number = e.target.dataset.number
            const op = e.target.dataset.operator
            displayScreen.textContent += number ? `${number}` : ` ${op} `

            if(!op){
                array.push(number)
            } else if(op && op !== '='){
                array.push(op)
                index = array.indexOf(op)
                currentOp = op;
            } else if(op === '='){
                // Calculate solution
                num1 = array.slice(0, index).join("")
                num2 = array.slice(index + 1).join("")
                console.log(num1, num2)
                
                if(currentOp === '÷'){
                    displayScreen.textContent += `${operate(divide, num1, num2)}`
                } else if(currentOp === 'x'){
                    displayScreen.textContent += `${operate(multiply, num1, num2)}`
                } else if(currentOp === '-'){
                    displayScreen.textContent += `${operate(subtract, num1, num2)}`
                } else if(currentOp === '+'){
                    displayScreen.textContent += `${operate(add, num1, num2)}`
                }
            }
        }
    })
}

populateDisplay();


function operate(operator,a,b){
    return operator(a,b);
}

function add(a,b){
    return parseInt(a) + parseInt(b);
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