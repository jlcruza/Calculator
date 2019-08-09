//Get the Page Size
let wdth = window.innerWidth;
let hgth = window.innerHeight;

let start = 0;
var nums = [];
let optrs = [];

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
//equal.addEventListener('click', onEqualPressed);


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
    else if(key.keyCode == 190){
        //Dot was Pressed
        onDotPressed();
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

const operators = document.querySelectorAll('.operatorKey');
operators.forEach(op=>{
    op.addEventListener('click', onOperatorPressed);
})

//Hover Functions
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
    let res = 0;
    if(operator == "+"){
        res = add(num1, num2);
    }
    else if(operator == "-"){
        res = sub(num1, num2);
    }
    else if(operator == "*"){
        res = mult(num1, num2);
    }
    else if(operator == "/"){
        res = div(num1, num2);
    }
    return res;
}

function onClearPressed(key){
    txt.innerHTML = "0";
    nums = [];
    optrs = [];
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
    txt.innerHTML += '.';
    dot.classList.add('disabled');
    dot.disabled = true;
}

function onOperatorPressed(key){
    if(key.target.innerHTML=='='){
        onEqualPressed();
        return;
    }

    let len = txt.innerHTML.length;
    if(txt.innerHTML[len-1]=='.'){
        onDelPressed();
    }
    if (isNaN(txt.innerHTML[len-1])){
        onDelPressed();
    }

    txt.innerHTML += key.target.innerHTML;
    dot.classList.remove('disabled');
    dot.disabled = false;
}

function onDelPressed(key){
    let len = txt.innerHTML.length;
    let newTxt = '';
    if(len>0){
        for(let i =0; i<len-1;i++){
            newTxt += txt.innerHTML[i];
        }
        txt.innerHTML = newTxt;
    }
    if(!txt.innerHTML.includes('.')){
        dot.classList.remove('disabled');
        dot.disabled = false;
    }
    if(txt.innerHTML==''){
        txt.innerHTML='0';
    }
}

function onEqualPressed(key){

    let st = 0;
    let str = txt.innerHTML;
    //Identifies the equation
    for(let i = 0; i<=str.length; i++){
        if(str[i]=='.'){

        }
        else if(isNaN(str[i])){
            nums.push(str.substring(st,i));
            optrs.push(str[i]);
            st = i + 1;
        }
    }

    let solving = true;
    let result = 0;

    while(solving){
        let multi = optrs.indexOf('*');
        let divi = optrs.indexOf('/');
        let addi = optrs.indexOf('+');
        let subi = optrs.indexOf('-');

        if(multi < divi && multi != -1){
            result = operate('*', nums[multi], nums[multi + 1]);
            nums.splice(multi, 2, result);
            optrs.splice(multi, 1);
        }
        else if(divi < multi && divi != -1){
            result = operate('/', nums[divi], nums[divi + 1]);
            if(isNaN(result)){
                solving = false;
            }
            else{
                nums.splice(divi, 2, result);
                optrs.splice(divi, 1);
            }
        }
        else if(addi < subi && addi != -1){
            result = operate('+', nums[addi], nums[addi + 1]);
            nums.splice(addi, 2, result);
            optrs.splice(addi, 1);
        }
        else if(subi < addi && subi != -1){
            result = operate('-', nums[subi], nums[subi + 1]);
            nums.splice(subi, 2, result);
            optrs.splice(subi, 1);
        }
        else{
            solving = false;
        }
    }
    txt.innerHTML = result;

}