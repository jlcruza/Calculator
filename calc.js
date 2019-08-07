//Get the Page Size
let wdth = window.innerWidth;
let hgth = window.innerHeight;

//Configurations for all buttons
const all = document.querySelectorAll('button');
all.forEach(key=>{
    key.style.fontSize = '24px';
    key.classList.add('keys');
    key.style.height = hgth/6 + 'px';
    key.style.width = wdth / 4 + 'px';
});

//Area where text is displayed
const txt = document.querySelector('#textOutput');
txt.style.height = (hgth/6 -1)+ 'px';
txt.style.width = '98.7%';
txt.innerText = '0';

//Custom button's configuration
const zero = document.querySelector('#BtnZero');
zero.style.height = (hgth/6 -1) + 'px';
zero.style.width = (wdth/2 -1)+ 'px';

const clr = document.querySelector('#BtnClear');
clr.style.height = (hgth/6 -1)+ 'px';
clr.style.width = (3*wdth/4 -1) + 'px';
clr.addEventListener('click', onClearPressed);

const dot = document.querySelector('#BtnDot');
dot.addEventListener('click', onDotPressed)

//Buttons Functionalities
const numbers = document.querySelectorAll('.numberKey');
numbers.forEach(btn=>{
    btn.addEventListener('click',onNumberPressed);
});


//Core functions
function add(num1, num2){
    return num1 + num2;
}
function sub(num1, num2){
    return num1 - num2;
}
function mult(num1, num2){
    return num1 * num2;   
}
function div(num1, num2){
    if(num2 != 0){
        return num1 / num2;
    }
    else{
        return "Cannot Divide by Zero"
    }
}

function operate(operator, num1, num2){
    if(operator == "+"){
        add(num1, num2);
    }
    else if(operator == "-"){
        sub(num1, num2);
    }
    else if(operator == "*"){
        mult(num1, num2);
    }
    else if(operator == "/"){
        div(num1, num2);
    }
}

function onClearPressed(key){
    txt.innerHTML = "0";
    dot.classList.remove('disabled');
    dot.disabled = false;
}

function onNumberPressed(key){
    if(txt.innerHTML=="0"){
        txt.innerHTML = key.target.innerHTML;
    }
    else{
        txt.innerHTML += key.target.innerHTML;
    }
}

function onDotPressed(key){
    txt.innerHTML += key.target.innerHTML;
    dot.classList.add('disabled');
    dot.disabled = true;
}