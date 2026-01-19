//AITANA GÓNZÁLEZ RODRÍGUEZ
//EJERCICIO 2:
//Crea una función denominada crearMatriz que acepte hasta tres argumentos y en función de
//estos cree matrices de 2 o 3 dimensiones con el tamaño indicado. 
// Los argumentos serán:
//- dimensiones: valores permitidos 2 o 3. Si se indica 2 es que se deberá crear una matriz de 2
//dimensiones de tamaño dim1xdim2.
//- dim1: tamaño de la primera dimensión. Valor entero mayor que 0
//- dim2: tamaño de la segunda dimensión. Valor entero mayor que 0
//- dim3: [obligatorio en caso de que dimensiones sea 3] tamaño de la tercera dimensión. Valor
//entero mayor que 0
//En caso de que se introduzcan menos argumentos o más de los debidos se deberá devolver un
//mensaje de error.
//De igual modo, si se introduce algún valor no válido se devolverá el error.
//Si todo es correcto crea la matriz y devuélvela mediante return.

//Cuando la página carga, se ejecuta la función principal()
window.onload = principal;

//Función para crear la matriz metiendo según los parámetros colocados
function crearMatriz(dimensiones, dim1, dim2, dim3) {
    //Compruebo que el número de argumentos sea 3 o 4
    if (arguments.length < 3 || arguments.length > 4) { //Sino, devuelvo un mensaje de error
        return "ERROR: Número incorrecto de argumentos";
    }

    //Compruebo que el primer parámetro es de 2 o de 3
    if (dimensiones !== 2 && dimensiones !== 3) {
        return "ERROR: El parámetro 'dimensiones' debe ser 2 o 3";
    }

    //Ambos parámetros, dim1 y dim2, deben ser enteros y mayores que 0, uso el !Number.isInteger para comprobar si no es numero entero
    if (!Number.isInteger(dim1) || dim1 <= 0 ||
        !Number.isInteger(dim2) || dim2 <= 0) {
        return "ERROR: dim1 y dim2 tienen que ser enteros mayores que 0";
    }
    //Si pido una matriz de tres dimensiones, dim3 es obligatorio y debe ser válido.
    //Si es 3 dimensiones, dim3 es obligatorio y debe ser válido por lo que también debe ser entero y mayor que 0
    if (dimensiones === 3) {
        if (!Number.isInteger(dim3) || dim3 <= 0) {
            return "ERROR: dim3 tiene que ser entero mayor que 0";
        }
    }

    //Creo la variable para matriz
    let matriz;

    //Si pido una matriz de dos dimensiones
    if (dimensiones === 2) {
        matriz = []; //Creo el array donde guardaré la matriz
        for (let i = 0; i < dim1; i++) { //Recorro la primera dimensión
            matriz[i] = []; //Creo otro array 
            for (let j = 0; j < dim2; j++) { //Recorro la segunda dimensión 
                matriz[i][j] = 0; //Aquí coloco el número 0 como valor por defecto, si quisiera poner otros número aleatorios, pondría un mathrandom*10 y matchfloor
            }
        }
    } else {
        //Si la matriz de tres dimensiones
        matriz = [];
        for (let i = 0; i < dim1; i++) {
            matriz[i] = []; //Primera dimensión
            for (let j = 0; j < dim2; j++) {
                matriz[i][j] = []; //Segunda dimensión
                for (let k = 0; k < dim3; k++) {
                    matriz[i][j][k] = 0; //Tercera dimensión con valor 0 por defecto
                }
            }
        }
    }
    return matriz; //Devuelvo la matriz que ya está creada según sus dimensiones
}

//Función para mostrar matrices de dos dimensiones 
function mostrarMatriz2D(matriz) {
    let texto = ""; //Cadena donde acumularé el el resultado
    for (let i = 0; i < matriz.length; i++) { //Recorro la matriz fila por fila
        texto += matriz[i].join(" ") + "<br>"; //Par que tenga el formato de matriz, convierto la fila en texto
    }
    return texto;
}

//Función para mostrar matrices de tres dimensiones
function mostrarMatriz3D(matriz) {
    let texto = "";
    for (let i = 0; i < matriz.length; i++) { //Recorro cada capa de la matriz
        texto += "Capa " + i + ":<br>";
        for (let j = 0; j < matriz[i].length; j++) {
            texto += matriz[i][j].join(" ") + "<br>"; //Muestro cada fila
        }
        texto += "<br>"; //Espacio entre capa
    }
    return texto;
}

//Muestro el resultado con esta función principal
function principal() {
    let salida = document.getElementById("salida");
    let texto = "<h2>Matrices</h2>";

    //Muestro dos ejemplos de matrices
    let caso1 = crearMatriz(2, 3, 4); //Matriz de dos dimensiones, 3x4
    let caso2 = crearMatriz(3, 2, 2, 2); //Matriz de dos dimensiones, 3x4

    //Muestro los casos de errores
    let error1 = crearMatriz(2); //Faltan argumentos
    let error2 = crearMatriz(5, 3, 3); //Las dimensiones no son válidas
    let error3 = crearMatriz(2, -3, 4); //dim1 siendo número negativo
    let error4 = crearMatriz(3, 2, 2); //falta dim3 siendo una matriz de 3 dimensiones
    let error5 = crearMatriz(3, 2, 2, 0); //dim es igual a 0

    texto += "<p>Matriz 2 Dimensiones:<br>" + mostrarMatriz2D(caso1) + "</p>";
    texto += "<p>Matriz 3 Dimensiones:<br>" + mostrarMatriz3D(caso2) + "</p>";

    texto += "<h4>Casos con errores</h4>";
    texto += "<p>Error 1:<br>" + error1 + "</p>";
    texto += "<p>Error 2:<br>" + error2 + "</p>";
    texto += "<p>Error 3:<br>" + error3 + "</p>";
    texto += "<p>Error 4:<br>" + error4 + "</p>";
    texto += "<p>Error 5:<br>" + error5 + "</p>";

    salida.innerHTML = texto; //Muestro el texto cuando ya está entero construido
};

