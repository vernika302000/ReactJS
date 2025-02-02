let hellobtn = document.querySelector('button');
hellobtn.addEventListener('click', inputName);

function showMsg(){
    alert("Namaste");
}


// objects
let person = {
    name : "cernika",
    age : "23"
}


function inputName(){
    let name = prompt("Enter Your Name Please");
    hellobtn.textContent = "My Name is : "+ name;
}

// template Literal
let string1 = "Hello";
let string2 = " Welcome";
let output = `${string1 + string2} Your String literal is`;
console.log(output);


