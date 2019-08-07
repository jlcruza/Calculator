//Get the Page Size
let wdth = window.innerWidth;
let hgth = window.innerHeight;


//Requiered Variables
let numA = 0;
let numB = 0;
let res = 0;


//Configurations for all buttons
const all = document.querySelectorAll('button');
all.forEach(key=>{
    key.style.fontSize = '30px';
    key.classList.add('keys');
    key.style.height = (hgth/6 -1)+ 'px';
    key.style.width = '25%';
});


//Hovering Effect
const graylish = document.querySelectorAll('.grayColored');
graylish.forEach(key=>{
    key.addEventListener('mouseenter', onCursorEnterGrayArea);
    key.addEventListener('mouseleave', onCursorExitGrayArea);
})

const orangelish = document.querySelectorAll('.operatorKey');
orangelish.forEach(key=>{
    key.addEventListener('mouseenter', onCursorEnterOrangeArea);
    key.addEventListener('mouseleave', onCursorExitOrangeArea);
})


//Area where text is displayed
const txt = document.querySelector('#textOutput');
txt.style.height = (hgth/6 -1)+ 'px';
txt.style.width = '100%';
txt.innerText = '0';
txt.fontSize = txt.style.height * .60 + 'px';


//Custom button's configuration
const zero = document.querySelector('#BtnZero');
zero.style.height = (hgth/6 -1) + 'px';
zero.style.width = '50%';

const clr = document.querySelector('#BtnClear');
clr.style.height = (hgth/6 -1)+ 'px';
clr.style.width = '75%';
clr.addEventListener('click', onClearPressed);

const dot = document.querySelector('#BtnDot');
dot.addEventListener('click', onDotPressed);

const equal = document.querySelector('#BtnResult');
equal.addEventListener('click', onEqualPressed);


//Handle Keyboard Press
window.addEventListener('keydown', onKeyPressed);
let waitSecondKey = false;

function onKeyPressed(key){
    if(!waitSecondKey && key.keyCode==16){
        //Shift was pressed
        waitSecondKey = true;
    }
    else if(waitSecondKey && key.keyCode == 187){
        //Plus Sign Intended
        
        waitSecondKey = false;
    }
    else if(waitSecondKey && key.keyCode == 56){
        //Mult Sign Intended
        
        waitSecondKey = false;
    }
    else if(key.keyCode == 8){
        //Delete was Pressed
        onDelPressed();
    }
    else{
        let keyDictionary = {
            48:'0',
            49:'1',
            50:'2',
            51:'3',
            52:'4',
            53:'5',
            54:'6',
            55:'7',
            56:'8',
            57:'9',
            187:'=',
            189:'-',
            191:'/',
        }
        if(key.keyCode>=48 && key.keyCode<=57){
            txt.innerHTML =(txt.innerHTML=='0')? keyDictionary[key.keyCode]: txt.innerHTML + keyDictionary[key.keyCode];
        }
        waitSecondKey = false;
    }
}

//Buttons Functionalities
const numbers = document.querySelectorAll('.numberKey');
numbers.forEach(btn=>{
    btn.addEventListener('click',onNumberPressed);
});

function onCursorEnterGrayArea(key){
    key.target.classList.add('darkerGray');
}
function onCursorExitGrayArea(key){
    key.target.classList.remove('darkerGray');
}
function onCursorEnterOrangeArea(key){
    key.target.classList.add('darkerOrange');
}
function onCursorExitOrangeArea(key){
    key.target.classList.remove('darkerOrange');
}

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

function onDelPressed(key){
    let len = txt.innerHTML.length;
    let newTxt = '';
    if(len>0 && !isNaN(txt.innerHTML[len-1])){
        for(let i =0; i<len-1;i++){
            newTxt += txt.innerHTML[i];
        }
        txt.innerHTML = newTxt;
    }
}

function onEqualPressed(key){

}