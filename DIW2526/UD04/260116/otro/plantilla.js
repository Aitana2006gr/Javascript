window.onload = principal;
// load es un evento que se lanza una vez que se ha cargado el html completo. Usando un manejador de este evento como el ejecutor de mi código principal me asegura que no ejecutará nada de código que intente acceder a algún elemento que no existe. Se puede usar la opción 'defer' en vez de esto al asignar el script en el html, sin problemas, pero el manejador del load es garantizado que funciona en todos los intérpretes posibles (aunque posiblemente defer a día de ohy también)


function principal() {
    document.getElementById('miBoton').onclick = manejadorClick;
    let creado = crearElemento("div", "texto interno", {
        id: "midiv_" + contador++,
        class: "roja",
        style: "border: solid 1px black; font-weight: bolder",
        aitana: "cacahuete"
    });
    console.log(creado);

}

let elementoNuevo;
let contador = 0;

function manejadorClick(e)  // Cuando se lanza un evento se envía siempre como atributo una instancia de la clase Event con toda la información referente al mismo
{
    let creado2 = crearElemento("p", "Bla bla bla", {
        id: "mip_" + contador++,
        class: "roja",
        style: "border: solid 3px black; font-weight: bolder",
        aitana: "cacahuete"
    });
    // elementoNuevo = document.createElement("div");
    // //elementoNuevo.innerHTML="Texto interno"; //Esto es perfectamente útil, pero está ya un poco viejo
    // let nodoTexto = document.createTextNode("Texto interno: " + contador);
    // elementoNuevo.appendChild(nodoTexto);

    // elementoNuevo.setAttribute("id", "miDiv_" + contador);
    // contador++;

    // elementoNuevo.setAttribute("class", "roja");
    // elementoNuevo.setAttribute("style", "border: solid 1px black; font-weight: bolder");
    // elementoNuevo.setAttribute("aitana", "cacahuete");

    let salida = document.querySelector('#salida');
    salida.innerHTML = "";
    //document.querySelector("#salida").appendChild(elementoNuevo); //almohadilla pk es css
    document.querySelector("#salida").appendChild(creado2);
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

