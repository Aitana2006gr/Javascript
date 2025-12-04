//AITANA GÓNZÁLEZ RODRÍGUEZ
//FUNCIONES para el script del ejercicio 2

//FUNCIONES DE SALIDA
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

//---------------------------------------------------------
// PROTOTIPO Electrodomestico
//---------------------------------------------------------
export function Electrodomestico() {
    this._id = "NOID"; // privado, texto 
    this._modelo = "NOMOD"; // privado, texto 
    this._consumo = 1; // privado, entero 
}

// GETTERS/SETTERS usando defineProperty
Object.defineProperty(Electrodomestico.prototype, "ID", {
    set: function (id) {
        const upper = String(id).toUpperCase();
        // Verificar y asignar 
        if (this.verificarID(upper)) {
            this._id = upper;
        }
    },
    get: function () {
        return this._id; // Devolver _id 
    }
});

Object.defineProperty(Electrodomestico.prototype, "Modelo", {
    set: function (modelo) {
        const m = String(modelo).toUpperCase();
        // Comprobar que al menos tenga una longitud de 6 caracteres 
        if (m.length >= 6) { 
            this._modelo = m;
        }
    },
    get: function () {
        return this._modelo; // Devolver _modelo 
    }
});

Object.defineProperty(Electrodomestico.prototype, "Consumo", {
    set: function (consumo) {
        const c = Number(consumo);
        // Comprobar que es un valor entero mayor o igual que 1 [cite: 62]
        if (Number.isInteger(c) && c >= 1) {
            this._consumo = c;
        }
    },
    get: function () {
        return this._consumo;
    }
});

//---------------------------------------------------------
// MÉTODOS prototipo Electrodomestico
//---------------------------------------------------------
Electrodomestico.prototype.toString = function () {
    // Devuelve "ELEC: _identificador; _modelo; consumo;" [cite: 62]
    return `ELEC: ${this._id}; ${this._modelo}; ${this._consumo};`;
};

Electrodomestico.prototype.verificarID = function (id) {
    // La entrada id deberá comenzar con "ELEC - " y tener entre 10 y 20 caracteres[cite: 62].
    // NOTA: El enunciado dice "ELEC " sin el guión, pero tu código usa "ELEC - ".
    // Mantengo tu código por consistencia con tu implementación anterior:
    if (!id.startsWith("ELEC - ")) return false; 
    return id.length >= 10 && id.length <= 20;
};

Electrodomestico.prototype.calcularConsumo = function (horas) {
    const h = Number(horas);
    // Verificará si horas es un numero >= 0, sino devolverá -1 [cite: 62]
    if (isNaN(h) || h < 0) return -1;
    return this._consumo * h;
};

//---------------------------------------------------------
// PROTOTIPO Lavadora (herencia de Electrodomestico)
//---------------------------------------------------------
export function Lavadora() {
    Electrodomestico.call(this); // Llama al constructor padre

    this._capacidad = 1; // privado, número, Valor por defecto: 1 
    this._bajoConsumo = false; // privado, bool, Valor por defecto: false 
    this._tipoCarga = 0; // privado, int, Valor por defecto: 0 
    
    // Array que no se podrá modificar 
    this._tiposCargaArr = Object.freeze(["Indefinida", "Lateral", "Superior"]);
}

// HERENCIA
Lavadora.prototype = Object.create(Electrodomestico.prototype);
Lavadora.prototype.constructor = Lavadora;

// GETTERS/SETTERS específicos
Object.defineProperty(Lavadora.prototype, "Capacidad", {
    set: function (v) {
        const n = Number(v);
        // Comprobar que es un valor entero mayor o igual que 1 [cite: 71]
        if (Number.isInteger(n) && n >= 1) this._capacidad = n;
    },
    get: function () {
        return this._capacidad; // Devolver el valor de _capacidad [cite: 71]
    }
});

Object.defineProperty(Lavadora.prototype, "BajoConsumo", {
    set: function (v) {
        this._bajoConsumo = Boolean(v); // Asignará el valor recibido a _bajoConsumo [cite: 71]
    },
    get: function () {
        return this._bajoConsumo; // Devolverá el valor de _bajoConsumo [cite: 71]
    }
});

Object.defineProperty(Lavadora.prototype, "TipoCarga", {
    set: function (v) {
        const n = Number(v);
        // Si el valor recibido es menor que 0 o mayor a 2, asignará el valor 0. De lo contrario, asignará el valor recibido[cite: 71].
        if (!Number.isInteger(n) || n < 0 || n > 2) {
             this._tipoCarga = 0;
        } else {
            this._tipoCarga = n;
        }
    },
    get: function () {
        return this._tipoCarga; // Devolverá el valor de _tipoCarga [cite: 71]
    }
});

Object.defineProperty(Lavadora.prototype, "TipoCargaTexto", {
    get: function () {
        // Devolverá el tipo de carga en formato texto usando _tipoCarga como índice [cite: 71]
        return this._tiposCargaArr[this._tipoCarga];
    }
});

//---------------------------------------------------------
// MÉTODOS Sobreescritos (Override)
//---------------------------------------------------------

Lavadora.prototype.toString = function () {
    // Llama al método de la clase madre y añade al final: _capacidad; _bajo Consumo _tipoCarga; [cite: 71]
    const padreString = Electrodomestico.prototype.toString.call(this);
    return `${padreString} ${this._capacidad}; ${this._bajoConsumo}; ${this._tipoCarga};`;
};

Lavadora.prototype.calcularConsumo = function (horas) {
    const base = Electrodomestico.prototype.calcularConsumo.call(this, horas);

    if (base === -1) return -1;

    // Si _bajoConsumo es true, devolverá la mitad del cálculo; de lo contrario, devolverá el cálculo normal[cite: 71].
    return this._bajoConsumo ? base / 2 : base;
};