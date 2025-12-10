//AITANA GÓNZÁLEZ RODRÍGUEZ
//FUNCIONES para el script del ejercicio 3

//CLASE Electrodomestico
export class Electrodomestico {
    //Constructor
    constructor() {
        this._id = "NOID";
        this._modelo = "NOMOD";
        this._consumo = 1;
    }

    //Getters y setters
    get ID() {
        return this._id;
    }
    set ID(id) {
        const upper = String(id).toUpperCase();
        if (this.verificarID(upper)) {
            this._id = upper;
        }
    }

    get Modelo() {
        return this._modelo;
    }
    set Modelo(modelo) {
        const m = String(modelo).toUpperCase();
        if (m.length >= 6) { //Comprueba la longitud mínima de 6
            this._modelo = m;
        }
    }

    get Consumo() {
        return this._consumo;
    }
    set Consumo(consumo) {
        const c = Number(consumo);
        if (Number.isInteger(c) && c >= 1) { //Comprueba que es entero >= 1
            this._consumo = c;
        }
    }

    //Métodos
    toString() {
        //Devuelve cadena de texto con su información
        return `ELEC: ${this._id}; ${this._modelo}; ${this._consumo};`;
    }

    verificarID(id) {
        //Debe comenzar con "ELEC" y tener entre 10 y 20 caracteres
        if (!id.startsWith("ELEC")) { return false; }
        return id.length >= 10 && id.length <= 20;
    }

    calcularConsumo(horas) {
        const h = Number(horas);
        if (isNaN(h) || h < 0) return -1; //Devuelve -1 si horas es inválido
        return this._consumo * h;
    }
}

//CLASE Lavadora
export class Lavadora extends Electrodomestico {
    //Defino los tipos de carga (inmutable) como una propiedad estática de la clase
    static TIPOS_CARGA = Object.freeze(["Indefinida", "Lateral", "Superior"]);

    constructor() {
        super(); //Llama al constructor de la clase padre (Electrodomestico)
        this._capacidad = 1;
        this._bajoConsumo = false;
        this._tipoCarga = 0;
    }

    //Getters y setters

    get Capacidad() {
        return this._capacidad;
    }
    set Capacidad(v) {
        const n = Number(v);
        if (Number.isInteger(n) && n >= 1) this._capacidad = n;
    }

    get BajoConsumo() {
        return this._bajoConsumo;
    }
    set BajoConsumo(v) {
        this._bajoConsumo = Boolean(v);
    }

    get TipoCarga() {
        return this._tipoCarga;
    }
    set TipoCarga(v) {
        const n = Number(v);
        //Si el valor es inválido (no está en el rango de 0-2), asigna 0.
        if (!Number.isInteger(n) || n < 0 || n > 2) {
            this._tipoCarga = 0;
        } else {
            this._tipoCarga = n;
        }
    }

    //Getter que devuelve la descripción textual del tipo de carga
    get TipoCargaTexto() {
        return Lavadora.TIPOS_CARGA[this._tipoCarga];
    }

    //MÉTODOS sobreescritos
    toString() {
        //Llama al toString del padre con 'super.toString()'
        const padreString = super.toString();
        return `${padreString} ${this._capacidad}; ${this._bajoConsumo}; ${this._tipoCarga};`;
    }

    calcularConsumo(horas) {
        //Llama al calcularConsumo del padre con 'super.calcularConsumo(horas)'
        const base = super.calcularConsumo(horas);

        if (base === -1) { return -1; }

        //Si tiene bajo consumo, devuelve la mitad
        if (this._bajoConsumo) {
            return base / 2;
        }

        return base;
    }
}