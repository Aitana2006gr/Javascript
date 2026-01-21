cajaA.addEventListener("click", pulsa, false);
cajaB.addEventListener("click", pulsa, true);
cajaC.addEventListener("click", pulsa, false);
miBoton.addEventListener("click", miManejador);
 //Comprueba el burbujeo cambiando false y true entre ellos, para ver 
function pulsa(e) {
    e.stopPropagation(); //Deten la propagación, no va a ejecutarse todas las cajas auqnue haga un click en la caja A, solo la caja A, no todas
    //Aunque se detenga la programación, el navegador detecta el click
    //e.preventDefault() //Con esto se le dice al sistema, que no haga la acción por defecto , por ejemplo submit
    console.log("Pulso " + this.id);
    /* Equivalente a
    e.currentTarget.id */
}

function miManejador(e){
    e.preventDefault();
}

/* ALMACENAMIENTO Consola navegador
sessionStorage.setItem("nombre", "aitana")
sessionStorage.getItem("nombre")
sessionStorage.setItem("anio",2006)
sessionStorage.getItem("anio")
for (let i=0; i< sessionStorage.length; i++){
console.log(sessionStorage.getItem(sessionStorage.key(i)));}

let datos= {nombre: "aitana", anio: 2006}
localStorage.setItem("miDatos", JSON.stringify(datos))
let recuperado = localStorage.getItem("miDatos");
recuperado
let objRecuperado= JSON.parse(recuperado);
objRecuperado.nombre
objRecuperado.anio

datos.toString=function(){return this.nombre + ", " + this.anio}

*/