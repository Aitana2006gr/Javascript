/**
 * DWEC04.01 - Ejercicio 4: Solución en Archivo Único
 * Implementación de Electrodomestico (Objeto Literal) y creación de 10 instancias.
 * Autores: Aitana González Rodríguez, [Nombre Compañero 1], [Nombre Compañero 2]
 * Curso: DAW2 2025-2026
 */

// =============================================================================
// I. DEFINICIÓN DEL OBJETO LITERAL ELECTRODOMESTICO
// =============================================================================

const Electrodomestico = {
    // Propiedades "privadas" (Convención)
    _id: "NOID", 
    _modelo: "NOMOD",
    _consumo: 1, // Valor por defecto: 1

    // -------------------------------------------------------------------------
    // MÉTODOS AUXILIARES Y DE INSTANCIA
    // -------------------------------------------------------------------------

    verificarID(id) {
        // Comienza con "ELEC " y longitud total entre 10 y 20 caracteres.
        return id.startsWith("ELEC ") && id.length >= 10 && id.length <= 20;
    },

    calcularConsumo(horas) {
        // Horas debe ser un número >= 0
        if (typeof horas === 'number' && horas >= 0) {
            return this._consumo * horas;
        }
        return -1; // Devolverá -1 si las horas no son válidas.
    },

    toString() {
        // Formato: "ELEC: _identificador; _modelo; consumo;"
        return `ELEC: ${this._id}; ${this._modelo}; ${this._consumo};`;
    },

    // -------------------------------------------------------------------------
    // SETTERS Y GETTERS PUROS
    // -------------------------------------------------------------------------

    // --- ID ---
    get id() {
        return this._id;
    },
    set id(id) {
        const idMayusculas = String(id).toUpperCase();
        if (this.verificarID(idMayusculas)) {
            this._id = idMayusculas;
        }
    },

    // --- MODELO ---
    get modelo() {
        return this._modelo;
    },
    set modelo(modelo) {
        const modeloMayusculas = String(modelo).toUpperCase();
        // Comprueba que tenga al menos 6 caracteres.
        if (modeloMayusculas.length >= 6) { 
            this._modelo = modeloMayusculas;
        }
    },

    // --- CONSUMO ---
    get consumo() {
        return this._consumo;
    },
    set consumo(consumo) {
        // Comprueba que sea un entero mayor o igual que 1.
        if (Number.isInteger(consumo) && consumo >= 1) {
            this._consumo = consumo;
        }
    },
};

// =============================================================================
// II. FUNCIONES AUXILIARES PARA CREACIÓN DE OBJETOS Y DATOS
// =============================================================================

/**
 * @description Crea un nuevo objeto que hereda las propiedades y métodos del objeto literal Electrodomestico.
 * @returns {object} Una nueva instancia de Electrodomestico.
 */
function crearElectrodomestico() {
    const nuevaInstancia = Object.create(Electrodomestico);
    // Inicializar propiedades
    nuevaInstancia._id = "NOID";
    nuevaInstancia._modelo = "NOMOD";
    nuevaInstancia._consumo = 1;

    return nuevaInstancia;
}

function generarIDAleatorio() {
    const prefijo = "ELEC ";
    const longitudRestante = Math.floor(Math.random() * 11) + 5; // [5, 15]
    let parteAleatoria = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < longitudRestante; i++) {
        parteAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return prefijo + parteAleatoria;
}

function generarModeloAleatorio() {
    const modelos = ["MODELO00A", "SUPERIOR-Z", "XLR8000", "ULTRA-TEC", "ABCDEF"];
    return modelos[Math.floor(Math.random() * modelos.length)];
}

function generarConsumoAleatorio() {
    return Math.floor(Math.random() * 10) + 1; // Entero [1, 10]
}

// =============================================================================
// III. LÓGICA DE EJECUCIÓN Y MANIPULACIÓN DEL DOM
// =============================================================================

/**
 * @description Inserta un mensaje en el cuerpo del HTML.
 * @param {string} mensaje - El texto a insertar.
 * @param {string} [clase=''] - Clase CSS opcional para el párrafo.
 */
function insertarMensaje(mensaje, clase = '') {
    // *** CORRECCIÓN CLAVE: Cambiar 'resultados' por 'salida' para que coincida con el HTML ***
    const resultadosDiv = document.getElementById('salida'); 
    
    // Si el div 'salida' existe, insertamos
    if (resultadosDiv) {
        const p = document.createElement('p'); 
        p.textContent = mensaje;
        if (clase) {
            p.className = clase;
        }
        resultadosDiv.appendChild(p);
    } else {
        // Opcional: Escribir en la consola si el div de salida no se encuentra
        console.error("Error: No se encontró el elemento con ID 'salida' en el HTML.");
    }
}

// Función principal, similar a la estructura de tu ejemplo
function principal() {
    insertarMensaje("--- INICIO: Creación de 10 Electrodomésticos Aleatorios (Objeto Literal) ---", "titulo-seccion");

    // Bucle de creación y muestra de los 10 objetos
    for (let i = 1; i <= 10; i++) {
        const electro = crearElectrodomestico();

        // Asignar valores aleatorios usando los SETTERS (aplicando validaciones)
        electro.id = generarIDAleatorio();
        electro.modelo = generarModeloAleatorio();
        electro.consumo = generarConsumoAleatorio();

        insertarMensaje(`*** Electrodoméstico #${i} ***`, "subtitulo");
        
        // Mostrar información usando el método toString() y los GETTERS
        insertarMensaje(`[toString()]: ${electro.toString()}`); 
        insertarMensaje(`  - Propiedades (Getters): ID: ${electro.id} | Modelo: ${electro.modelo} | Consumo: ${electro.consumo}`);

        // Probar el método calcularConsumo()
        const horasUso = Math.random() * 24; 
        const consumoTotal = electro.calcularConsumo(horasUso);
        insertarMensaje(`  - Cálculo: Consumo de ${horasUso.toFixed(2)} horas = ${consumoTotal.toFixed(2)} unidades.`);
    }
    
    insertarMensaje("--- FIN: 10 Electrodomésticos Creados ---", "titulo-seccion");
}

// Cuando la página carga, se llama a la función principal
document.addEventListener('DOMContentLoaded', principal);