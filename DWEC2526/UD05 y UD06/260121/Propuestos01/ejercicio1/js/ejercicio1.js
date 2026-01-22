window.onload = principal;
//window.addEventListener("load", principal);

function principal() {
    console.log("Funciona");
    //Creo los elementos del DOM
    let titEjercicio = crearElemento("h2", "Ejercicio 1");
    let titMiNombre = crearElemento("h1", "Aitana González Rodríguez");
    let inputNombre = crearElemento("input", undefined, { type: "text", id: "campoNombre", placeholder: "Nombre" });
    let inputCantidad = crearElemento("input", undefined, { type: "number", id: "campoCantidad", placeholder: "Cantidad" });
    let selectOpciones = crearElemento("select", undefined, { id: "campoComida"});
    let optionValor0 = crearElemento("option", "Selecciona...", { value: "" });
    let optionValor1 = crearElemento("option", "Patatas", { value: "Patatas" });
    let optionValor2 = crearElemento("option", "Tomates", { value: "Tomates" });
    let optionValor3 = crearElemento("option", "Manzanas", { value: "Manzanas" });
    let botonCrear=crearElemento("input", "",  { type: "button", id: "botonCrear", value:"Crear" });

    //Coloco los elementos en el DOM
    //console.log(titEjercicio);
    document.body.appendChild(titEjercicio);
    titEjercicio.appendChild(titMiNombre);
    document.body.appendChild(inputNombre);
    document.body.appendChild(inputCantidad);
    document.body.appendChild(selectOpciones);
    selectOpciones.appendChild(optionValor0);
    selectOpciones.appendChild(optionValor1);
    selectOpciones.appendChild(optionValor2);
    selectOpciones.appendChild(optionValor3);
    //document.body.innerText+="<br>";
    document.body.appendChild(botonCrear); 

    //Asignar el manejador del click
    document.getElementById("botonCrear").addEventListener("click", botonCrearDivision , false);
    document.body.appendChild(crearElemento("div", undefined,{id:"divSalida"}));


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

function botonCrearDivision() {

    let divSalida=document.getElementById("divSalida");
    let texto=document.getElementById("campoNombre").value+
    " come "+document.getElementById("campoCantidad").value+" "+ document.getElementById("campoComida").value;

    let nuevaDivision=crearElemento("div", texto, {style: "backgroundColor: red"});
    divSalida.parentNode.replaceChild(nuevaDivision, divSalida);
}

function manejadorClick() {
    //Limpiar
    //Coger los datos del DOM
    //Generar salida
    //Añadir la salida al DOM

}












    //Jose ibañez benchezdfwa linkedin
    //aiprompts, aiplan, ai features 
    // aitoolkits aicontext, proyecto todos
    // contexto de cada proyecto//
    //cursor, postgre