// Clase Telefono, heredando de Dispositivo
function Telefono() {
    Dispositivo.call(this); // Llamada al constructor padre

    this._pulgadas = 0;
    this._tipoPanel = 0;
    this._tiposPanelArr = ["OLED", "AMOLED", "QLED", "NanoCell"];
}

// Herencia del prototipo
Telefono.prototype = Object.create(Dispositivo.prototype);
Telefono.prototype.constructor = Telefono;

// ====== SETTERS Y GETTERS ======

Telefono.prototype.setPulgaddas = function(valor) {
    this._pulgadas = valor;
};

Telefono.prototype.getPulgadas = function() {
    return this._pulgadas;
};

Telefono.prototype.setTipoPanel = function(tipo) {
    if (tipo < 0 || tipo > 3) {
        this._tipoPanel = 0;
    } else {
        this._tipoPanel = tipo;
    }
};

Telefono.prototype.getTipoPanel = function() {
    return this._tipoPanel;
};

Telefono.prototype.getTipoPanelTexto = function() {
    return this._tiposPanelArr[this._tipoPanel];
};

// ====== MÉTODOS ======

Telefono.prototype.toString = function() {
    return (
        Dispositivo.prototype.toString.call(this) +
        `${this._pulgadas}; ${this._tipoPanel};`
    );
};

Telefono.prototype.verificarID = function(id) {
    if (!id.startsWith("TELF - ")) return false;
    return id.length >= 10 && id.length <= 20;
};
