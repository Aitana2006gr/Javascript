//AITANA GÓNZÁLEZ RODRÍGUEZ
//FUNCIONES para el script del ejercicio 2

//PROTOTIPO Electrodomestico
export function Electrodomestico() {
    this._id = "NOID";
    this._modelo = "NOMOD";
    this._consumo = 1;
}

//GETTERS/SETTERS usando defineProperty
Object.defineProperty(Electrodomestico.prototype, "ID", { //Defino una nueva propiedad directamente en el objeto
    set: function (id) { //Defino la función Setter para la propiedad ID
        const mayus = String(id).toUpperCase(); //Coloco la cadena a mayúsculas
        //Verifico y asigno
        if (this.verificarID(mayus)) {
            this._id = mayus;
        }
    },
    get: function () {
        return this._id; //Devuelvo el id
    }
});

Object.defineProperty(Electrodomestico.prototype, "Modelo", {
    set: function (modelo) {
        const m = String(modelo).toUpperCase();
        //Compruebo que tiene al menos 6 caracteres
        if (m.length >= 6) {
            this._modelo = m;
        }
    },
    get: function () {
        return this._modelo; //Devuelvo el modelo
    }
});

Object.defineProperty(Electrodomestico.prototype, "Consumo", {
    set: function (consumo) {
        const c = Number(consumo);
        //Compruebo que es un valor entero mayor o igual que 1
        if (Number.isInteger(c) && c >= 1) {
            this._consumo = c;
        }
    },
    get: function () {
        return this._consumo;
    }
});

//MÉTODOS prototipo Electrodomestico
Electrodomestico.prototype.toString = function () {
    //Devuelve los datos
    return `ELEC: ${this._id}; ${this._modelo}; ${this._consumo};`;
};

Electrodomestico.prototype.verificarID = function (id) {
    //La entrada id deberá comenzar con "ELEC" y tener entre 10 y 20 caracteres
    if (!id.startsWith("ELEC")) { return false; }
    return id.length >= 10 && id.length <= 20;
};

Electrodomestico.prototype.calcularConsumo = function (horas) {
    const h = Number(horas);
    //Comprueba si las horas es un numero >= 0, sino devolverá -1 
    if (isNaN(h) || h < 0) { return -1; }
    return this._consumo * h;
};

//PROTOTIPO Lavadora (de Electrodomestico)
export function Lavadora() {
    Electrodomestico.call(this); //Llama al constructor padre Electrodomestico

    this._capacidad = 1; //El valor por defecto: 1 
    this._bajoConsumo = false; //El valor por defecto: false 
    this._tipoCarga = 0; //privado, int, Valor por defecto: 0 

    //Array que no se podrá modificar 
    this._tiposCargaArr = Object.freeze(["Indefinida", "Lateral", "Superior"]);
}

//herencia
Lavadora.prototype = Object.create(Electrodomestico.prototype);
Lavadora.prototype.constructor = Lavadora;

//Geters y setters
Object.defineProperty(Lavadora.prototype, "Capacidad", {
    set: function (v) {
        const n = Number(v);
        //Compruebo que es un valor entero mayor o igual que 1
        if (Number.isInteger(n) && n >= 1) { this._capacidad = n; }
    },
    get: function () {
        return this._capacidad; // Devolver el valor de _capacidad
    }
});

Object.defineProperty(Lavadora.prototype, "BajoConsumo", {
    set: function (v) {
        this._bajoConsumo = Boolean(v); // Asignará el valor recibido a _bajoConsumo
    },
    get: function () {
        return this._bajoConsumo; //Devolverá el valor de _bajoConsumo
    }
});

Object.defineProperty(Lavadora.prototype, "TipoCarga", {
    set: function (v) {
        const n = Number(v);
        //Si el valor recibido es menor que 0 o mayor a 2, asignará el valor 0. De lo contrario, asignará el valor recibido
        if (!Number.isInteger(n) || n < 0 || n > 2) {
            this._tipoCarga = 0;
        } else {
            this._tipoCarga = n;
        }
    },
    get: function () {
        return this._tipoCarga; //Devolverá el valor de _tipoCarga
    }
});

Object.defineProperty(Lavadora.prototype, "TipoCargaTexto", {
    get: function () {
        //Devolverá el tipo de carga en formato texto usando _tipoCarga como índice
        return this._tiposCargaArr[this._tipoCarga];
    }
});

//MÉTODOS Sobreescritos (Override)
Lavadora.prototype.toString = function () {
    //Llama al método de la clase patre y añade el resto
    const padreString = Electrodomestico.prototype.toString.call(this);
    return `${padreString} ${this._capacidad}; ${this._bajoConsumo}; ${this._tipoCarga};`;
};

Lavadora.prototype.calcularConsumo = function (horas) {
    const base = Electrodomestico.prototype.calcularConsumo.call(this, horas);

    if (base === -1) { return -1 };//Si _bajoConsumo es true, devolverá la mitad del cálculo,
    // de lo contrario, devolverá el cálculo normal
};