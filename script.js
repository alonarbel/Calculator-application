//Switch to 1 if "=" pressed
let equal_pressed = 0;

//Get all the buttons
let button_input = document.querySelectorAll(".input-button");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");

//Get the input
let input = document.getElementById("input");

window.onload = () => {
  input.value = "";
};
//Access each class using forEach
button_input.forEach((button_class) => {
  button_class.addEventListener("click", () => {
    //Restart the input string 
    if (equal_pressed == 1) {
      input.value = "";
      equal_pressed = 0;
    }
    //Restart the input after an error
    if(input.value == "SYNTAX ERROR"||input.value=="MATH ERROR"){
        if(button_class.value!="*" && button_class.value!="/"){
          input.value = button_class.value;
        }
    }
    else{
        //Cheking if there is two operators in a row
        if(validInput(button_class.value)){
            input.value += button_class.value;
        }
        else{
            input.value = "SYNTAX ERROR";
        }
    }
    });
});
//Solve the user's input when clicked on equal sign
equal.addEventListener("click", () => {
    equal_pressed = 1;
    let inp_val = ""
    inp_val = input.value;
    let last_val = inp_val.slice(-1);
    try {
        //Checks the last element
        if(validSofix(last_val)){
        //Evaluate user's input
        let solution = eval(inp_val);
        //Checks the /0 issue
        if(solution == "Infinity"){
            input.value = "MATH ERROR";
        }
        else{
        if (Number.isInteger(solution)) {
            input.value = solution;
        } else {
            input.value = solution.toFixed(2);
        }}}
      else{
        input.value = "SYNTAX ERROR";
      }}
    catch (err) {
        //If user has entered invalid input
        alert("Invalid Input");
        }});
//Clear Whole Input
clear.addEventListener("click", () => {
  input.value = "";
});

function validInput(val){
    let operators = ["+", "-", "*", "/","."];
    let not_prefix_operators = ["*","/"];
    let str = "";
    str = input.value;
    if(operators.includes(val) && operators.includes(str.slice(-1))||not_prefix_operators.includes(val)&&str==""){
            return false;
        }
    return true;
}
function validSofix(val){
  let operators = ["+", "-", "*", "/","."];
  if(operators.includes(val)){
    return false;
  }
  return true;
}
