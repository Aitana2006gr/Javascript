// AITANA GONZÁLEZ RODRÍGUEZ

function calculosMultiples(tipoCalculo, ...args) {
    // 1. Si no recibe ningún parámetro
    if (tipoCalculo === undefined) {
        // La sintaxis con el parámetro rest '...args' siempre tendrá al menos 'tipoCalculo',
        // si el usuario llama a la función sin nada, 'tipoCalculo' será undefined.
        console.log("No se introdujeron parámetros");
        return; // Retorna sin hacer nada más
    }

    // Aseguramos que el tipoCalculo es una cadena para poder convertirlo a mayúsculas
    let calculo = String(tipoCalculo).toUpperCase();

    // 2. El primer parámetro solo podrá tomar los valores E o L
    if (calculo !== 'E' && calculo !== 'L') {
        console.log("El cálculo escogido no es válido");
        return;
    }

    // 3. En caso de escoger 'E' (Exponente)
    if (calculo === 'E') {
        // Se esperan solo otros dos argumentos más (el total son 3: 'E', base, exponente)
        if (args.length !== 2) {
            console.log("Se ha introducido un número erróneo de parámetros");
            return;
        }

        // Extraemos la base y el exponente (no se necesita verificar que sean números)
        const base = args[0];
        const exponente = args[1];

        // Devuelve el resultado de elevar el primero al segundo
        // Utilizamos Math.pow(base, exponente) para calcular la potencia
        return Math.pow(base, exponente);
    }

    // 4. En caso de introducir una 'L' (Listar y Ordenar)
    if (calculo === 'L') {
        // A partir del segundo parámetro (que ya están en 'args')
        // se consideran números que no es necesario verificar.

        // Ordenar los números de mayor a menor (descendente)
        // La función de comparación (a, b) => b - a ordena de mayor a menor
        // Creamos una copia del array antes de ordenar para no modificar 'args' original, aunque en este contexto no es crítico.
        const numerosOrdenados = args.slice().sort((a, b) => b - a);

        // Devuelve mediante return el listado de números ordenados
        return numerosOrdenados;
    }
}

// --- EJEMPLOS DE USO (Para probar en la consola) ---

console.log("--- Pruebas para calculosMultiples ---");

// 1. Sin parámetros
console.log("Caso 1: Sin parámetros");
calculosMultiples(); // Salida esperada: "No se introdujeron parámetros"

// 2. Cálculo no válido
console.log("\nCaso 2: Cálculo no válido");
calculosMultiples('X', 1, 2); // Salida esperada: "El cálculo escogido no es válido"

// 3. Caso 'E' (Exponente) - Correcto
console.log("\nCaso 3: 'E' Correcto (2 elevado a 4)");
console.log(`Resultado: ${calculosMultiples('E', 2, 4)}`); // Salida esperada: 16

// 3. Caso 'E' (Exponente) - Número erróneo de parámetros (demasiados)
console.log("\nCaso 4: 'E' Parámetros erróneos (demasiados)");
calculosMultiples('e', 2, 4, 8); // Salida esperada: "Se ha introducido un número erróneo de parámetros"

// 3. Caso 'E' (Exponente) - Número erróneo de parámetros (demasiado pocos)
console.log("\nCaso 5: 'E' Parámetros erróneos (pocos)");
calculosMultiples('E', 5); // Salida esperada: "Se ha introducido un número erróneo de parámetros"

// 4. Caso 'L' (Listar) - Correcto (números enteros y decimales)
console.log("\nCaso 6: 'L' Correcto");
const listadoL = calculosMultiples('L', 10, 3.5, 99, 0, 75.1, 10);
console.log("Listado original: [10, 3.5, 99, 0, 75.1, 10]");
console.log("Listado ordenado (mayor a menor):", listadoL); 
// Salida esperada: [99, 75.1, 10, 10, 3.5, 0]

// 4. Caso 'L' (Listar) - Sin números, solo 'L'
console.log("\nCaso 7: 'L' Sin números");
const listadoLVacio = calculosMultiples('l');
console.log("Listado ordenado:", listadoLVacio); 
// Salida esperada: []

// 4. Caso 'L' (Listar) - Con tipo en minúscula
console.log("\nCaso 8: 'l' Correcto (en minúscula)");
const listadoLMin = calculosMultiples('l', 5, 2, 8);
console.log("Listado ordenado (mayor a menor):", listadoLMin); 
// Salida esperada: [8, 5, 2]