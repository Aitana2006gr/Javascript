window.onload = principal;
//window.addEventListener("load", principal);

function principal() {
    console.log("Funciona");
    //Creo los elementos del DOM
    let titEjercicio = crearElemento("h2", "Ejercicio 1");
    let titNombre= crearElemento("h1", "Aitana González Rodríguez");
    let inputNombre= crearElemento("input", "Nombre");
    let inputOpciones= crearElemento("input", "Cantidad");
    let br=crearElemento("br");

    // console.log(titEjercicio);
    document.body.appendChild(titEjercicio);
    //append(titNombre);
    titEjercicio.appendChild(titNombre);
    titNombre.appendChild(br);
    titNombre.appendChild(inputNombre);
    //in

    //Asignar el manejador del click
    

}

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

function botonCrearDivision(){

}

function manejadorClick(){
    //Limpiar
    //Coger los datos del DOM
    //Generar salida
    //Añadir la salida al DOM
//Jose ibañez benchezdfwa linkedin
//aiprompts, aiplan, ai features 
// aitoolkits aicontext, proyecto todos
// contexto de cada proyecto//
//cursor, postgre

}