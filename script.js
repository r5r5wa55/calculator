// operand = 1 2 3 4 มีสองต่า ตือซ้ายและขวา 3 + 4 3=operandซ้าย 4=operandขว
// operator= -*+ เครื่องหมายต่างๆ


const calculatorDispplay=document.querySelector('h1');
const inputBtn=document.querySelectorAll('button'); //array
const clearBtn=document.getElementById('clear-btn');

const calculate={
    "/":(firstNumber,secondNumber)=>secondNumber!=0 ? firstNumber/secondNumber:"error",
    "*":(firstNumber,secondNumber)=>firstNumber * secondNumber,
    "+":(firstNumber,secondNumber)=>firstNumber + secondNumber,
    "-":(firstNumber,secondNumber)=>firstNumber - secondNumber,
    "=":(firstNumber,secondNumber)=>secondNumber
}

let firstValue = 0; // ตัวเลขที่ 1 
let operatorValue = '';
let waittwoValue = false;

function setNumberValue(number){
    if(waittwoValue){
        calculatorDispplay.textContent=number;
        waittwoValue=false;
    }else{
        const displayValue = calculatorDispplay.textContent;
        calculatorDispplay.textContent = displayValue==='0' ? number : displayValue+number;
    }
    //
   

}
function callOperator(operator){
    if(operatorValue && waittwoValue){
        operatorValue=operator;
        return; 
    }
    const curryValue = Number(calculatorDispplay.textContent);
    if(!firstValue){
        firstValue=curryValue;
    }else{
       const result = calculate[operatorValue](firstValue,curryValue);
       calculatorDispplay.textContent=result;
       firstValue=result;
       if(firstValue==="error"){
        resetAll();
       }
    }
    operatorValue=operator;
    waittwoValue=true;
    
   
}

function addDecimal(){
    if(waittwoValue)return;
    if(!calculatorDispplay.textContent.includes(".")){
        calculatorDispplay.textContent=`${calculatorDispplay.textContent}.`;
    }
    
  
}


inputBtn.forEach((input)=>{
    if(input.classList.length===0){
        input.addEventListener('click',()=>setNumberValue(input.value));
    }else if(input.classList.contains("operator")){
        input.addEventListener('click',()=>callOperator(input.value));
    }else if(input.classList.contains("decinal")){
        input.addEventListener('click',()=>addDecimal());
    }

});
function resetAll(){
    let firstValue = 0; // ตัวเลขที่ 1 
    let operatorValue = '';
    let waittwoValue = false;
    calculatorDispplay.textContent='0';
}

clearBtn.addEventListener('click',()=>resetAll());
