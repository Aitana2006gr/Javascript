//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que gestiona un objeto literal Electrodomestico y genera 10 instancias aleatorias
const Electrodomestico = {
    //Propiedades "privadas"
    _id: "NOID",
    _modelo: "NOMOD",
    _consumo: 1,
    _bajoConsumo: false,

    //MÉTODOS auxiliares y de instancia
    verificarID(id) {
        //Comienza con "ELEC" y longitud total entre 10 y 20 caracteres
        return id.startsWith("ELEC") && id.length >= 10 && id.length <= 20;
    },

    calcularConsumo(horas) {
        //Horas >= 0
        if (typeof horas !== 'number' || horas < 0) return -1;

        let base = this._consumo * horas;
        //Aplica reducción si tiene bajo consumo
        return this._bajoConsumo ? base / 2 : base; //Operario ternario que aplica reducción si tiene bajo consumo
    },

    toString() {
        return `ELEC: ${this._id}; ${this._modelo}; ${this._consumo}; BajoConsumo: ${this._bajoConsumo}`;
    },

    //SETTERS Y GETTERS
    //De id
    get id() {
        return this._id;
    },
    set id(id) {
        const idMayusculas = String(id).toUpperCase();
        if (this.verificarID(idMayusculas)) {
            this._id = idMayusculas;
        }
    },

    //De modelo
    get modelo() {
        return this._modelo;
    },

    set modelo(modelo) {
        const modeloMayusculas = String(modelo).toUpperCase();
        //Comprueba que tenga al menos 6 caracteres.
        if (modeloMayusculas.length >= 6) {
            this._modelo = modeloMayusculas;
        }
    },

    //De consumo
    get consumo() {
        return this._consumo;
    },
    set consumo(consumo) {
        //Comprueba que sea un entero mayor o igual que 1.
        if (Number.isInteger(consumo) && consumo >= 1) {
            this._consumo = consumo;
        }
    },
    //De bajo consumo
    get bajoConsumo() {
        return this._bajoConsumo;
    },
    set bajoConsumo(valor) {
        this._bajoConsumo = Boolean(valor);
    },
};

//FUNCIONES AUXILIARES para la creación de objetos y datos
//Función crearElectrodomestico: Crea un nuevo objeto que hereda las propiedades y métodos del objeto literal Electrodomestico
function crearElectrodomestico() {
    const obj = Object.create(Electrodomestico);
    //Inicializo las propiedades
    obj._id = "NOID";
    obj._modelo = "NOMOD";
    obj._consumo = 1;
    obj._bajoConsumo = false;
    return obj; //Devuelve una nuevo objeto o instancia
}

//Función generarIDAleatorio 
function generarIDAleatorio() {
    const prefijo = "ELEC";
    const longitudRestante = Math.floor(Math.random() * 11) + 6; //[6, 16]
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
    return Math.floor(Math.random() * 10) + 1; //Entero [1, 10]
}

function generarBajoConsumoAleatorio() {
    return Math.random() < 0.5; // 50% de probabilidad
}

//Ejecución y manipulación del DOM

//Función insertarMensaje que inserta un mensaje en el cuerpo del html
function insertarMensaje(mensaje, clase = '') {
    const resultados = document.getElementById('salida');

    //Si el div 'salida' existe, insertamos los mensajes
    if (resultados) {
        const p = document.createElement('p');
        p.textContent = mensaje;
        if (clase) {
            p.className = clase;
        }
        resultados.appendChild(p);
    } else {
        //Si no se encuentra el elemento, aparece este error
        console.error("Error: No se encontró el elemento con ID 'salida' en el HTML");
    }
}

// Función principal, similar a la estructura de tu ejemplo
function principal() {
    insertarMensaje("Creación de 10 Electrodomésticos aleatorios (Objeto Literal)", "titulo-seccion");

    //Bucle de creación y muestra de los 10 objetos
    for (let i = 1; i <= 10; i++) {
        const electro = crearElectrodomestico();

        //Asigno los valores aleatorios usando los SETTERS
        electro.id = generarIDAleatorio();
        electro.modelo = generarModeloAleatorio();
        electro.consumo = generarConsumoAleatorio();
        electro.bajoConsumo = generarBajoConsumoAleatorio();


        insertarMensaje(`Electrodoméstico #${i}`, "subtitulo");

        //Muestro la información usando el método toString() y los getters
        insertarMensaje(`Método toString(): ${electro.toString()}`);
        insertarMensaje(`-Propiedades (Getters): ID: ${electro.id} / Modelo: ${electro.modelo} / Consumo: ${electro.consumo} /Bajo Consumo: ${electro.bajoConsumo}`);

        //Compruebo el método calcularConsumo()
        const horasUso = Math.random() * 24;
        const consumoTotal = electro.calcularConsumo(horasUso);
        insertarMensaje(`-Cálculo: Consumo de ${horasUso.toFixed(2)} horas = ${consumoTotal.toFixed(2)} unidades`);
        //Linea para separar un poco
        insertarMensaje("---------------------------------------------------------------------------------------------------------------");
    }
}

//Cuando la página HTML ha cargado completamente, se ejecuta la función principal
document.addEventListener('DOMContentLoaded', principal);
