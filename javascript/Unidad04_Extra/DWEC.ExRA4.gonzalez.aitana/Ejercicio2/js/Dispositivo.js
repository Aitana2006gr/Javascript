//Clase Dispositivo definida mediante Class
class Dispositivo {
    constructor(_id = "NOID", _autonomia = 0, _carga = 0) { //Constructor
        //Valores por defecto
        this._id = _id;
        this._autonomia = _autonomia;
        this._carga = _carga;
    }

    //Setters
    set id(id) {
        //Convierte la entrada id a mayúsculas con el toUppercase
        let mayusculas = id.toUpperCase();
        //Comprueba con el método verificarID y si es true, modificará el valor de la propiedad
        if (this.verificarID(mayusculas)) {
            this._id = mayusculas;
        }
    }

    set autonomia(valor) {
        //Asigna el valor recibido a _autonomia
        this._autonomia = valor;
    }

    set carga(valor) {
        //Comprueba que el valor sea entero entre 0 y 100 (incluidos)
        if (Number.isInteger(valor) && valor >= 0 && valor <= 100) {
            //Se asigna el valor a _carga
            this._carga = valor;
        }
    }

    //Getters
    get id() {
        //Devuelve el valor de _id
        return this._id;
    }

    get autonomia() {
        //Devuelve el valor de _autonomia
        return this._autonomia;
    }

    get carga() {
        //Devuelve el valor de _carga
        return this._carga;
    }

    //Métodos
    //Método toString para mostrar la información
    toString() {
        //Devuelve la siguiente cadena de texto con sus pripiedades
        return `DISP: ${this._id}; ${this._autonomia}; ${this._carga};`;
    }

    //Método verificarID que devuelve booleano y devuelve true o false si la cadena es mayor o igual a 10
    verificarID(id) {
        return id.length >= 10;
    }

    //Método horasRestantes que devuelve true o false las horas restantes
    horasRestantes(uso) {
        return uso * this._autonomia * this._carga / 100;
    }
}