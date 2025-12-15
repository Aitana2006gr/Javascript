//AITANA GONZÁLEZ RODRÍGUEZ
//Función calculosMultiples que tiene por parametro el tipoCalculo como operación y un número indeterminado de argumentos
function calculosMultiples(tipoCalculo, ...args) {
    //1.Si no recibe ningún parámetro
    if (tipoCalculo === undefined) {
        //El tipoCalculo es undefined si a la función se la llama sin argumentos
        console.log("No se introdujeron parámetros");//Muestra mensaje si no lo es
        return;
    }


    //2.El primer parámetro solo podrá tomar los valores "E" o "L"
    //Se convierte el tipoCalculo a una cadena escrita en mayúsculas
    let calculo = String(tipoCalculo).toUpperCase();
    //Comprueba que el primer parametro es "E" o "L"
    if (calculo !== "E" && calculo !== "L") {
        console.log("El cálculo escogido no es válido"); //Muestra mensaje si no lo es
        return;
    }

    //3.En caso de escoger "E" (exponente)
    if (calculo === "E") {
        //Se comprueba que haya solo dos argumentos más ya que, en total, son 3: 'E', base y exponente
        if (args.length !== 2) {
            console.log("Se ha introducido un número erróneo de parámetros"); //Mensaje de error
            return;
        }

        //Guardo la base y el exponente
        const base = args[0];  //La expresión args[], usa los elementos del array args
        const exponente = args[1];

        //Devuelvo el resultado, utilizando Math.pow(base, exponente) para calcular la potencia
        return Math.pow(base, exponente);
    }

    //4.En caso de introducir una "L" (listar y ordenar)
    if (calculo === "L") {
        //Ordenar los números de mayor a menor (descendente)
        //La función de comparación (a, b) => b - a ordena de mayor a menor
        //Creo una copia del array antes de ordenar para no modificar el array "args" original
        const numerosOrdenados = args.slice().sort((a, b) => b - a);

        //Devuelve mediante return el listado de numerosOrdenados
        return numerosOrdenados;
    }
}

//MUESTRO POR CONSOLA
console.log("CALCULOS MULTIPLES:");
//Sin parámetros
console.log("Caso 1: Sin parámetros");
calculosMultiples();

//Cálculo no válido
console.log("\nCaso 2: Cálculo no válido");
calculosMultiples('X', 1, 2);

//Caso "E" (exponente)
console.log("\nCaso 3: 'E' Correcto (2 elevado a 4)");
console.log(`Resultado: ${calculosMultiples('E', 2, 4)}`); //16

console.log("\nCaso 4: 'E' Parámetros erróneos");
calculosMultiples('e', 2, 4, 8);


//Caso "L" (listar)
console.log("\nCaso 5: 'L' Correcto");
const listadoL = calculosMultiples('L', 23, 25.5, 0, 98, 73, 27);
console.log("Listado original: [23, 25.5, 0, 98, 73, 27]");
console.log("Listado ordenado (mayor a menor):", listadoL);//[ 98, 73, 27, 25.5, 23, 0 ]

console.log("\nCaso 6: 'L' Sin números");
const listadoLVacio = calculosMultiples('l');
console.log("Listado ordenado:", listadoLVacio);//[]