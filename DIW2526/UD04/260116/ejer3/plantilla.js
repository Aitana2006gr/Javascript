window.onload = principal;
// load es un evento que se lanza una vez que se ha cargado el html completo. Usando un manejador de este evento como el ejecutor de mi código principal me asegura que no ejecutará nada de código que intente acceder a algún elemento que no existe. Se puede usar la opción 'defer' en vez de esto al asignar el script en el html, sin problemas, pero el manejador del load es garantizado que funciona en todos los intérpretes posibles (aunque posiblemente defer a día de ohy también)
let contador = 0;

function principal() {
    document.getElementById('miBoton').onclick = manejadorClick;
    crearValoresDefecto();
    miBoton.click();

}

function manejadorClick(e)  // Cuando se lanza un evento se envía siempre como atributo una instancia de la clase Event con toda la información referente al mismo
{
    // let divTitulo= crearElemento("div", undefined, {
    //     id: "divTabla_" + contador++
    // });

    let numFilas = document.getElementById("inFilas").value;
    let numColumnas = document.getElementById("inColumnas").value;
    // console.log(numFilas);
    // console.log(numColumnas);
    let tabla1 = crearTabla(numFilas, numColumnas);

    let salida = document.querySelector('#salida');
    salida.innerHTML = "";
    // document.querySelector("#salida").appendChild(divTitulo);
    document.querySelector("#salida").appendChild(tabla1);
}



//atributo hacerlo objeto
function crearElemento(etiqueta, texto, atributos) {
    //Si no se introduce 'etiqueta' es que no sabe usar la función
    let elementoNuevo = document.createElement(etiqueta);
    //Si no se quiere introducir texto ha de ser undefined o ""
    if (texto !== undefined) {
        textointerno = document.createTextNode(texto);
        elementoNuevo.appendChild(textointerno);
    }
    //Ejemplo de atributos:
    // {   id: "mip_" + contador++,
    //     class: "roja",
    //     style: "border: solid 3px black; font-weight: bolder",
    //     aitana: "cacahuete"
    // }
    if (atributos !== undefined) {
        for (clave in atributos) {
            elementoNuevo.setAttribute(clave, atributos[clave]);
        }
    } 

    return elementoNuevo;
}


function crearTabla(intFilas, intColumnas) {
    let tabla =
        crearElemento("table", undefined, {
            id: "miTabla_" + contador++
        });

    let titulo = crearElemento("caption", "Tabla generada");
    tabla.appendChild(titulo);

    for (let i = 0; i <= intFilas - 1; i++) {
        let fila = crearElemento("tr");
        for (j = 0; j <= intColumnas - 1; j++) {
            let celda = crearElemento("td", "Celda_" + i + "_" + j, {
                id: "td_" + i + "_" + j
            });

            celda.addEventListener("mouseover", manejadorCeldaEncima, false);
            // setTimeout(manejadorCeldaEncima,3);
            celda.addEventListener("click", manejadorCeldaClick, false)
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    return tabla;
}

function crearValoresDefecto() { //Esta para borrar
    document.getElementById("inFilas").value = "4";
    document.getElementById("inFilas").value = "7";
}

function manejadorCeldaEncima(e) {
    console.log(e);
    this.style.backgroundColor = "red";
}

function manejadorCeldaClick(e) {
    console.log(e);
    this.style.backgroundColor = "blue";
}
function borrarCelda(){
let celdaBorrada= celda.parentNode.removeChild(celda);

}

//Deberia tener solo un manejadorCelda, donde pongo todos los eventos posibles para las celdas 

