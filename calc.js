const all = document.querySelectorAll('button');
all.forEach(key=>{
    key.classList.add('keys');
})

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