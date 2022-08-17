
let displayScreen = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.row button');

// Initialise the required variables
let displayVal;
let array = new Array();
let opClicked = false;
array[0] = '';
array[1] = '';
let currentSolution;
let currentOp;

function populateDisplay(){
    buttons.forEach(button => {
        button.onclick = (e) => {
            const number = e.target.dataset.number
            const op = e.target.dataset.operator
            displayScreen.textContent += number ? `${number}` : ` ${op} `

            // If an operator was chosen and it wasnt equals, make opClicked true and store the current operator chosen
            if(op && op != '='){
                opClicked = true;
                currentOp = op;
            }
            // If an operator has not been clicked yet, store the numbers inputed as the first number
            // Else  if opClicked = true and no operator has been clicked, store any number after that as the second number
            if(!opClicked){
                array[0] += parseInt(number)
            }else{
                if(!op){
                    array[1] += parseInt(number);
                }
            }
            
            // If the equal sign is clicked, perform the operation depending on the operator that was clicked and store the value in a variable.
            if(op === '='){
                if(currentOp === '-'){
                    currentSolution = operate(subtract, array[0], array[1]);
                } else if(currentOp === 'x'){
                    currentSolution = operate(multiply, array[0], array[1])
                } else if(currentOp === '÷'){
                    currentSolution = operate(divide, array[0], array[1])
                } else if(currentOp === '+'){
                    currentSolution = operate(add, array[0], array[1])
                }

                // Update the screen to display teh solution,
                // set the first number to the current solution number and set the second number to nothing
                // Set opClicked to false
                displayScreen.textContent += currentSolution;
                array[0] = currentSolution;
                array[1] = '';
                opClicked = false;
            }
            console.log(array)

            
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