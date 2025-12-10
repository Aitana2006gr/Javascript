//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que crea matrices de 1, 2 o 3 dimensiones con valores en forma de coordenadas.

//Hago el import de las funciones del ejercicio a este script principal
import { mostrarError, mostrarMensaje, crearMatriz, mostrarMatriz } from "./funciones.js";

//Variable global donde se guardará la matriz creada
let matrizCreada = null;

//Cuando la página carga
document.addEventListener("DOMContentLoaded", principal);

//Función principal que asigna los eventos y controla el proceso del ejercicio
function principal() {

    //Constante del elemento botón
    const boton = document.getElementById("crear");
    //Salida esta en la función mostrar matriz o según el mensaje, en otra función

    //Evento del botón
    boton.onclick = function (evento) {

        evento.preventDefault(); //Evita recargar la página al usar formulario

        try {
            //Obtención de valores de los inputs
            const dim = parseInt(document.getElementById("dim").value.trim());
            const d1 = parseInt(document.getElementById("d1").value.trim());

            //Recibo los valores como texto para detectar si están vacíos
            const d2Texto = document.getElementById("d2").value.trim();
            const d3Texto = document.getElementById("d3").value.trim();

            //Convierto a parseInt solo si tienen contenido, si no, son undefined, uso operario ternario
            const d2 = d2Texto === "" ? undefined : parseInt(d2Texto);
            const d3 = d3Texto === "" ? undefined : parseInt(d3Texto);


            //VALIDACIONES
            //Booleado para indicar si se pasan las validaciones
            let validado = false; 

            //Empleo un switch para cada caso, según el número de dimensiones que se quieren
            switch (dim) {
                case 1:
                    //Misma validación en todos los casos según el numero de dimensiones, de si es entero y mayor o igual a 1
                    if (!Number.isInteger(d1) || d1 < 1) {
                        mostrarError("El tamaño de la dimensión 1 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    //Compruebo los campos sobrantes, es decir, d2 y d3 deben ser undefined para que se active, así también en el caso 2 
                    if (typeof d2 !== 'undefined' || typeof d3 !== 'undefined') { //
                        mostrarError("Para una matriz de 1 dimensión, no se deben rellenar dimensiones 2 o 3");
                        return;
                    }
                    //Devuelvo true en todos, si no salta error al validar
                    validado = true;
                    break;

                case 2:
                    if (!Number.isInteger(d1) || d1 < 1) {
                        mostrarError("El tamaño de la dimensión 1 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    if (!Number.isInteger(d2) || d2 < 1) {
                        mostrarError("El tamaño de la dimensión 2 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    if (typeof d3 !== 'undefined') {
                        mostrarError("Para una matriz de 2 dimensiones, no se debe rellenar la dimensión 3");
                        return;
                    }
                    validado = true;
                    break;

                case 3:
                    if (!Number.isInteger(d1) || d1 < 1) {
                        mostrarError("El tamaño de la dimensión 1 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    if (!Number.isInteger(d2) || d2 < 1) {
                        mostrarError("El tamaño de la dimensión 2 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    if (!Number.isInteger(d3) || d3 < 1) {
                        mostrarError("El tamaño de la dimensión 3 tiene que ser un valor entero mayor o igual a 1");
                        return;
                    }
                    validado = true;
                    break;

                default:
                    mostrarError("Introduce correctamente los valores de entrada. El número de dimensiones puede ser 1, 2 o 3");
                    return;
            }

            //Creo la matriz solo si las validaciones han pasado y el validado es true
            if (validado) {
                matrizCreada = crearMatriz(d1, d2, d3);
                mostrarMensaje("Matriz creada correctamente");
                mostrarMatriz(matrizCreada);
            }

        } catch (error) { //Por si ocurre algún otro error
            mostrarError("No se ha podido crear la matriz:" + error.message);
        }
    }
}
