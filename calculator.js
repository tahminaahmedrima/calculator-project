let runningTotal = 0;

let buffer = "0";

let previousOperator = null;

const screen = document.querySelector(' .screen');

function buttonClick(value) {

    if (isNaN(value)) {
        //if this is not number
        handleSymbol(value);

    } else {
        //This must be a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    console.log('handleSymbol',symbol )

switch (symbol) {
    case 'C':
    buffer = '0';
    runningTotal = 0;
    break; 

    case '=' :
        if (previousOperator === null) {
            // need u two numbers to do math
            return;
        }

        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;

    case '←':
        if(buffer.length === 1) {
            buffer = '0';
        } else {
            buffer = buffer.substring (0,buffer.length - 1);
            
        }
        break;
    case '+':
    case '−':
    case '×':
    case '÷':
        handleMath(symbol);
        break;
    }
}

function handleMath(symbol) { 
    console.log('handleMath',symbol);
    if (buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
    runningTotal = intBuffer;
} else {
    flushOperation(intBuffer)
}
previousOperator = symbol;
buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {

    if (buffer === '0') {
        buffer = numberString;

    } else {
        buffer += numberString;
    }
    
    console.log ('buffer', buffer);
}

function init () {

    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        console.log(event);
        buttonClick(event.target.innerText);

    })
}
init(); 