//Clase Dispositivo definida mediante prototipos
function Dispositivo(_id="NOID",_autonomia=0,_carga=0) { //Constructor
    //Valores por defecto
    this._id = _id;
    this._autonomia = _autonomia;
    this._carga = _carga;
}

//Setters
Dispositivo.prototype.setID = function(id) {
    //Convierte la entrada id a mayúsculas con el toUppercase
    let mayusculas = id.toUpperCase();
    //Comprueba con el método verificarID y si es true, modificará el valor de la propiedad
    if (this.verificarID(mayusculas)) {
        this._id = mayusculas;
    }
};

Dispositivo.prototype.setAutonomia = function(valor) {
    //Asigna el valor recibido a _autonomia
    this._autonomia = valor;
};

Dispositivo.prototype.setCarga = function(valor) {
    //Comprueba que el valor sea entero entre 0 y 100 (incluidos)
    if (Number.isInteger(valor) && valor >= 0 && valor <= 100) {
        //Se asigna el valor a _carga
        this._carga = valor;
    }
};

//Getters
Dispositivo.prototype.getID = function() {
    //Devuelve el valor de _id
    return this._id;
};

Dispositivo.prototype.getAutonomia = function() {
    //Devuelve el valor de _autonomia
    return this._autonomia;
};

Dispositivo.prototype.getCarga = function() {
    //Devuelve el valor de _carga
    return this._carga;
};

//Métodos
//Método toString para mostrar la información
Dispositivo.prototype.toString = function() {
    //Devuelve la siguiente cadena de texto con sus pripiedades
    return `DISP: ${this._id}; ${this._autonomia}; ${this._carga};`;
};

//Método verificarID que devuelve booleano y devuelve true o false si la cadena es mayor o igual a 10
Dispositivo.prototype.verificarID = function(id) {
    return id.length >= 10;
};

//método horasRestantes que devuelve true o false las horas restantes
Dispositivo.prototype.horasRestantes = function(uso) {
    return uso * this._autonomia * this._carga / 100;
};
