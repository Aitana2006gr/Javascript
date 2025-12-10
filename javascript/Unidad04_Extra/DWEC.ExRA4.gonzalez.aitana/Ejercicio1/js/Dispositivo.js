// Clase Dispositivo definida mediante prototipos
function Dispositivo() {
    this._id = "NOID";
    this._autonomia = 0;
    this._carga = 0;
}

// ====== SETTERS Y GETTERS ======

Dispositivo.prototype.setID = function(id) {
    if (!id) return;

    let may = id.toUpperCase();
    if (this.verificarID(may)) {
        this._id = may;
    }
};

Dispositivo.prototype.getID = function() {
    return this._id;
};

Dispositivo.prototype.setAutonomia = function(valor) {
    this._autonomia = valor;
};

Dispositivo.prototype.getAutonomia = function() {
    return this._autonomia;
};

Dispositivo.prototype.setCarga = function(valor) {
    if (Number.isInteger(valor) && valor >= 0 && valor <= 100) {
        this._carga = valor;
    }
};

Dispositivo.prototype.getCarga = function() {
    return this._carga;
};

// ====== MÉTODOS ======

Dispositivo.prototype.toString = function() {
    return `DISP: ${this._id}; ${this._autonomia}; ${this._carga};`;
};

Dispositivo.prototype.verificarID = function(id) {
    return id.length >= 10;
};

Dispositivo.prototype.horasRestantes = function(uso) {
    return uso * this._autonomia * this._carga / 100;
};
