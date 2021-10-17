
const CalculationButtons = document.querySelectorAll('.CalculationButtons');
let paraResultSection = document.getElementById('resultSection');
let paraOpHistory = document.getElementById('operationHistorySection');

let displayUnit = {
    displayTokens: function(e) {
        const token = e.target.textContent;
        if(/\d/g.test(token)) {
            paraResultSection.textContent += token;
        }
        else if(!/\d/g.test(token) && paraResultSection.textContent.indexOf(token) < 0 && paraResultSection.textContent.length !== 0) {
            paraResultSection.textContent += token;
        }
    },
    removeTokens: function() {
        paraOpHistory.textContent = '';
        paraResultSection.textContent = paraResultSection.textContent.substring(0, paraResultSection.textContent.length -1);
    },
    clearTokens: function() {
        paraOpHistory.textContent = '';
        paraResultSection.textContent = '';
    },
    moveToHistory: function(operation) {
        paraOpHistory.textContent = '';
        paraOpHistory.textContent = operation;

    },
    displayResult: function(result) {
        let displayScreen = document.getElementById('resultSection');
        displayScreen.textContent = '';
        displayScreen.textContent = result;

    }
};

let logicUnit = {
    operate : function (num1, num2, operator) {
        if(operator === '-') {
            displayUnit.moveToHistory(`${num1} ${operator} ${num2} =`)
            displayUnit.displayResult(num1 - num2);
        }
        if(operator === '/') {
            displayUnit.moveToHistory(`${num1} ${operator} ${num2} =`)
            displayUnit.displayResult(num1 / num2);
        }
        if(operator === '*') {
            displayUnit.moveToHistory(`${num1} ${operator} ${num2} =`)
            displayUnit.displayResult(num1 * num2);
        }
        if(operator === '+') {
            displayUnit.moveToHistory(`${num1} ${operator} ${num2} =`)
            displayUnit.displayResult(num1 + num2);
        }
    },
    pickOperation: function() {
        const operator = paraResultSection.textContent.match(/\/|\*|\+|-/g)['0'];
        const num1Regex = new RegExp(`.*(?=${'\\' + operator})`);
        const num2Regex = new RegExp(`(?<=${'\\' + operator}).*`);
        const num1 = parseFloat(paraResultSection.textContent.match(num1Regex)['0']);
        const num2 = parseFloat(paraResultSection.textContent.match(num2Regex)['0']);
        // console.log(num1 + num2)
        logicUnit.operate(num1, num2, operator);
    }

}

function init() {
    CalculationButtons.forEach(button => {
        button.addEventListener('click', displayUnit.displayTokens);
    })
   let deleteButton = document.getElementById('deleteButton');
   deleteButton.addEventListener('click', displayUnit.removeTokens);

   let clearButton = document.getElementById('clearButton');
   clearButton.addEventListener('click', displayUnit.clearTokens);
   
   const equalButton = document.getElementById('equalButton');
   equalButton.addEventListener('click', logicUnit.pickOperation)
}
window.onload = init;