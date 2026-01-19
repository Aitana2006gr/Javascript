//AITANA GÓNZÁLEZ RODRÍGUEZ
//EJERCICIO 1:
//Escribe una función que indicando un array, el índice de la primera posición y 
// el número de elementos a desplazar, devuelva un array con los mismos elementos originales, 
// pero los indicados mediante índice de inicio y número de ellos ubicados al final.

//Ejecutar cuando cargue la página
window.onload = principal;

//inicio: indice de la primera posición
//cantidad: número de elementos a desplazar 

//Función que desplaza los elementos de un array
function desplazar(array, inicio, cantidad) {
    let arrayFinal = []; //Creo el nuevo array donde se guardará el array resultado
    let movidos = []; //Array donde coloco los movidos

    //Copio los que no se van a mover, es decir, los que están colocados antes de "inicio"
    // y los que están después del grupo que se va a mover
    for (let i = 0; i < array.length; i++) {//Recorro todo
        if (i < inicio || i >= inicio + cantidad) { //Si la posición es menor a inicio o 
            //después del último que se mueve
            arrayFinal.push(array[i]); //Lo añado al arrayFinal
        }
    }

    //Copio los que sí se mueven
    for (let i = inicio; i < inicio + cantidad; i++) { //Comienzo a mover desde inicio hasta inicio+ cantidad -1
        movidos.push(array[i]); //Lo añado al otro array de movidos
    }

    //Ahora junto los dos arrays, añados elementos del array movidos al arrayFinal, el cual previamente, ya tiene agregados los que no se movian
    for (let i = 0; i < movidos.length; i++) { //Lo recorre entero hasta que se termine
        arrayFinal.push(movidos[i]); //Lo añade
    }

    return arrayFinal; //Se devuelve el array con los mismos elementos originales pero diferentes
}

//Función principal que es llamada cuando se carga la página
function principal() {
    const salida = document.getElementById("salida");

    //Para limpiar
    salida.innerHTML = "";

    //Prueba con un array de números
    const arrayOriginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const inicio = 3;
    const cantidad = 4;
    const arrayFinal = desplazar(arrayOriginal, inicio, cantidad);

    //Compruebo también con un array de cadenas de texto 
    const arrayOriginalTexto = ["Hola", "me", "llamo", "Aitana", "y", "este", "es", "mi", "ejercicio", "de", "js"];
    const inicioT = 3;
    const cantidadT = 4;
    const arrayFinalTexto = desplazar(arrayOriginalTexto, inicioT, cantidadT);

    //Defino una función para mostrar los arrays
    function mostrarArray(titulo, original, resultado) { //La he hecho para formatear el texto más facilmente a la hora de mostrar cada array prueba
        salida.innerHTML += ` 
        ${titulo}
        <p>Array original: [${original}]</p>
        <p>Array resultante: [${resultado}]</p>
        <br>`;
    }
    
    //Muestro los arrays para probar
    mostrarArray("ARRAYS NÚMEROS", arrayOriginal, arrayFinal);
    mostrarArray("ARRAYS STRING", arrayOriginalTexto, arrayFinalTexto);
}


