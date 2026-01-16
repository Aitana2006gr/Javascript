window.onload = principal;
// load es un evento que se lanza una vez que se ha cargado el html completo. Usando un manejador de este evento como el ejecutor de mi código principal me asegura que no ejecutará nada de código que intente acceder a algún elemento que no existe. Se puede usar la opción 'defer' en vez de esto al asignar el script en el html, sin problemas, pero el manejador del load es garantizado que funciona en todos los intérpretes posibles (aunque posiblemente defer a día de ohy también)

let selAitanas;
let selFilasPares;
let selFilasImpares;

function principal() {
    document.getElementById('miBoton').onclick=manejadorClick;  
    let numDivs = 4
    for (let i = 1; i <= numDivs; i++) {
        document.getElementById("div" + i).addEventListener("click", manejadorClickCambiaColorDivision, false);
    }

    let celdas = document.querySelectorAll("#miTabla tr td");
    console.log(celdas);

    for (let i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("mouseover", manejadorCeldaEncima, false);
        celdas[i].addEventListener("onmousedown", manejadorCeldaUltima, false);
    }
}

function manejadorClick(e)  // Cuando se lanza un evento se envía siempre como atributo una instancia de la clase Event con toda la información referente al mismo
{
    selAitanas = document.querySelectorAll('td[aitana="true"]');
    selFilasPares = document.querySelectorAll('#miTabla tr:nth-child(even)');
    selFilasPares = document.querySelectorAll('#miTabla tr:nth-child(odd)');

    let idElemento = document.getElementById('entrada').value;
    let elementoSeleccionado = document.getElementById(idElemento);
    //let elemenSel= document.querySelector('#'+idElemento); //Se tiene que poner la almohadilla, es muy importante

    if (elementoSeleccionado != null) {
        let valorAitana = elementoSeleccionado.getAttribute("aitana");
        console.log(valorAitana);
        if (valorAitana === "true") {
            elementoSeleccionado.setAttribute("aitana") = "false";
            valorAitana="false";
        }
        else {
            elementoSeleccionado.setAttribute('aitana') = "true";
            valorAitana="true";
        }
        console.log("Ahora el valor de 'aitana' es: "+valorAitana);
    } else {
        let elementoSeleccionado;
        console.error("No se ha encontrado un elemento con ID: " + idElemento);
    }
}