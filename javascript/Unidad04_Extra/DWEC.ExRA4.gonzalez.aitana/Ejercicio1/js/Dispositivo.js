//Clase Dispositivo definida mediante prototipos
function Dispositivo() {
    //Valores por defecto
    this._id = "NOID";
    this._autonomia = 0;
    this._carga = 0;
}

//Setters
Dispositivo.prototype.setID = function(id) {
    if (!id) return;

    let mayusculas = id.toUpperCase();
    if (this.verificarID(mayusculas)) {
        this._id = mayusculas;
    }
};

Dispositivo.prototype.setAutonomia = function(valor) {
    this._autonomia = valor;
};

Dispositivo.prototype.setCarga = function(valor) {
    if (Number.isInteger(valor) && valor >= 0 && valor <= 100) {
        this._carga = valor;
    }
};

//Getters
Dispositivo.prototype.getID = function() {
    return this._id;
};

Dispositivo.prototype.getAutonomia = function() {
    return this._autonomia;
};

Dispositivo.prototype.getCarga = function() {
    return this._carga;
};

//Métodos
//Método toString para mostrar la información
Dispositivo.prototype.toString = function() {
    return `DISP: ${this._id}; ${this._autonomia}; ${this._carga};`;
};

//Método verificarID que devuelve booleano y comprueba si la cadena es mayor o igual a 10
Dispositivo.prototype.verificarID = function(id) {
    return id.length >= 10;
};

//método horasRestantes que devuelve las horas restantes
Dispositivo.prototype.horasRestantes = function(uso) {
    return uso * this._autonomia * this._carga / 100;
};
