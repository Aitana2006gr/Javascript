//AITANA GÓNZÁLEZ RODRÍGUEZ
//FUNCIONES para el script del ejercicio 1
//Función mostrarError(): Muestra un mensaje de error dentro de la división "salida"
export function mostrarError(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML = `<div style="color:red">ERROR: No se ha podido crear la matriz: ${mensaje}</div>`;
}

//Función mostrarMensaje(): Muestra mensajes informativos en la salida
export function mostrarMensaje(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML = `<div>${mensaje}</div>`;
}

// Función crearMatriz(): Crea una matriz 1D, 2D o 3D según los parámetros recibidos
export function crearMatriz(d1, d2, d3) {
    //Como más adelante, en la función principal, ya valido que se genere la matriz según sus campos, 
    // solo coloco aquí unas pequeñas comprobaciones, enfocandome principalmente en las operaciones.

    //Uso bucles recorriendo arrays y ya
    //1 dimensión
    if (!d2 && !d3) {
        let array = [];
        for (let x = 0; x < d1; x++) {
            array[x] = `${x}`; //Según el enunciado, el valor tenía que ser igual a la coordenada
        }
        return array;
    }

    //2 dimensiones
    if (d2 && !d3) {
        let array = [];
        for (let x = 0; x < d1; x++) {
            array[x] = [];
            for (let y = 0; y < d2; y++) {
                array[x][y] = `${x}-${y}`;
            }
        }
        return array;
    }

    //3 dimensiones
    let array = [];
    for (let x = 0; x < d1; x++) {
        array[x] = [];
        for (let y = 0; y < d2; y++) {
            array[x][y] = [];
            for (let z = 0; z < d3; z++) {
                array[x][y][z] = `${x}-${y}-${z}`;
            }
        }
    }
    return array;
}

//FUNCIÓN mostrarMatriz()
//Muestra la matriz creada en el div "salida"
export function mostrarMatriz(matriz) {
    const salida = document.getElementById("salida");

    //Determinamos la dimensión de la matriz
    function dimension(array) {
        if (!Array.isArray(array)) { //Si el elemento no es un array, la dimensión es 0
            return 0; 
        }
        return 1 + dimension(array[0]); //La dimensión es 1
    }

    const dim = dimension(matriz);

    let html = "";

    if (dim === 1) {
        //1D-table
        html = "<table border='1' cellspacing='0' cellpadding='5'><tr>"; //Pues he utilizado tablas para la visualización
        for (let i = 0; i < matriz.length; i++) {
            html += `<td>${matriz[i]}</td>`; //Voy insertando cada elemento como una celda de la tabla
        }
        html += "</tr></table>";
    } else if (dim === 2) {
        //2D-tabla
        html = "<table border='1' cellspacing='0' cellpadding='5'>";
        for (let i = 0; i < matriz.length; i++) {
            html += "<tr>"; //Inicio otra fila y hago lo mismo
            for (let j = 0; j < matriz[i].length; j++) {
                html += `<td>${matriz[i][j]}</td>`;
            }
            html += "</tr>";
        }
        html += "</table>";
    } else if (dim === 3) {
        //3D-tabla por cada “capa”
        for (let x = 0; x < matriz.length; x++) {//Pues es lo mismo que antes, pero he cambiado solo el nombre a xyz
            //Bucle externo
            html += `<div><strong>Capa ${x}:</strong></div>`;
            html += "<table border='1' cellspacing='0' cellpadding='5'>";
            //Bucle intermedio
            for (let y = 0; y < matriz[x].length; y++) {
                html += "<tr>";
                //Bucle interno
                for (let z = 0; z < matriz[x][y].length; z++) {
                    html += `<td>${matriz[x][y][z]}</td>`;
                }
                html += "</tr>";
            }
            html += "</table><br/>";
        }
    }

    salida.innerHTML = html; //Todos los html +=se han ido añadiendo al html final, por lo que se va acumulando el texto
}