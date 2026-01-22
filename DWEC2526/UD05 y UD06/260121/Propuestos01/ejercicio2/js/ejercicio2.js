window.onload = principal;
function principal() {
let nombre= document.getElementById("cambiaNombre");
nombre.innerText="Aitana González Rodríguez";

//let selColores=document.getElementById("inColor");
let colorSeleccionado=document.getElementById("inColor").value;

let btnResetear=document.getElementById("btnResetear");


let divSalida=document.getElementById("div_salida")

let arrayDivCSS=document.querySelectorAll("div"); //Array que contiene cada <div id="div_color">, el container y el salida



let arrayDivisiones=document.getElementsByTagName("div");
//Quitar el div con id did_salida
//Quitar el div con id container
let a


console.log(colorSeleccionado);
console.log(btnResetear);
console.log(divSalida);
console.log(arrayDivisiones);
console.log(arrayDivCSS);


}

function manejadorClick(){ //argumento nombredivision?


}