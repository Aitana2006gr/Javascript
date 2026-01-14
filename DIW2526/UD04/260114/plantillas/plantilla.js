window.onload = principal;
// load es un evento que se lanza una vez que se ha cargado el html completo. Usando un manejador de este evento como el ejecutor de mi código principal me asegura que no ejecutará nada de código que intente acceder a algún elemento que no existe. Se puede usar la opción 'defer' en vez de esto al asignar el script en el html, sin problemas, pero el manejador del load es garantizado que funciona en todos los intérpretes posibles (aunque posiblemente defer a día de ohy también)

function principal() {
    //document.getElementById("miBoton").onclick = manejadorClick;
    /*document.getElementById("miBoton").addEventListener("click", manejadorClick, false); //False para el burbujeo normal
    document.getElementById("div1").addEventListener("click", manejadorClickCambiaColorDivision,false);
    document.getElementById("div2").addEventListener("click", manejadorClickCambiaColorDivision,false);
    document.getElementById("div3").addEventListener("click", manejadorClickCambiaColorDivision,false);
    document.getElementById("div4").addEventListener("click", manejadorClickCambiaColorDivision,false);
    */
    let numDivs = 4
    for (let i = 1; i <= numDivs; i++) {
        document.getElementById("div" + i).addEventListener("click", manejadorClickCambiaColorDivision, false);
    }

    
    let celdas=document.querySelectorAll("#miTabla tr td");
    console.log(celdas);
    
    /*
    for(let i=0;i<celdas.length;i++){
        celdas[i].addEventListener("mouseover", manejadorCeldaEncima, false);
    }
    */
    /*
   for(let i=0;i<celdas.length;i++){
        celdas[i].addEventListener("mouseover", manejadorCeldaEncima, false);
        celdas[i].addEventListener("onmousedown",manejadorCeldaUltima,false);
    }
    */

    //td_0_0.mouseover=encima;
    //document.getElementById("td_0_0").onmouseover=encima;
    let numColumnas = 4;
    let numFilas = 5;
    for (let i = 0; i <= numFilas-1; i++) {
        for (j = 0; j <= numColumnas-1; j++) {
            document.getElementById("td_" + i + "_" + j).addEventListener("mouseover", manejadorCeldaEncima, false); 
        }
    }  
}
function manejadorClick(e)  // Cuando se lanza un evento se envía siempre como atributo una instancia de la clase Event con toda la información referente al mismo
{
    console.log(this.id);   // En todo manejador de evento podemos usar this para acceder al elemento que lanzo dicho evento
    console.warn(this);
    console.error(e.currentTarget);
    // Tanto this como e.currentTarget hacen referencia al mismo elemento. Pero podemos encontrar e.target y e.focus que pueden o no ser el mismo elemento. RECOMENDACIÓN? usar e.currentTarget quita problemas si la app es muy grande con muchos elementos que manejan el mismo tipo de evento.

    document.getElementById("salida").innerHTML =
        "Has escrito: " +
        document.getElementById("entrada").value;

    // La mejor manera de cambiar el estilo desde código a un elemento es desde su atributoo style y el nombre del estilo a cambiar usando camelCase, en el que se eliminan los guiones y la letra inmediatamente siguiente a un guión se pone en mayúscula: background-color  --> backgroundColor
    document.querySelector("#salida").style.backgroundColor = "coral";
    //en css es background-color, pero al escribirlo en javascript, se usa el camel de bC
    // Ojo, que he usado dos formas distintas para acceder al elemento con id salida, pero si quería podría haber hecho lo siguiente:
    salida.style.border = "0.5vw dashed blue";
    // Esto último debería funcionar en todos los navegadores, pero no garantizo todos los intérpretes.
}

//Cuando se pulse div uno, por console log que salga el id, this.id
function manejadorClickCambiaColorDivision(e) {
    let salida = document.getElementById("salida");
    console.log(this.id);
    //document.getElementById("salida").innerHTML=this.id;
    salida.innerHTML = this.id;

    let elementoEvento = document.getElementById(this.id);

    let estiloElemento = window.getComputedStyle(elementoEvento); //Aqui coge todo, tanto lo hecho con el css como con el codigo de aqui de javascript
    salida.style.backgroundColor = estiloElemento.backgroundColor;
}

//Fondo rojo
function manejadorCeldaEncima(e) {
    console.log(e);
    this.style.backgroundColor = "red";
}

function manejadorCeldaUltima(e){
    this.style.backgroundColor="blue";
}
