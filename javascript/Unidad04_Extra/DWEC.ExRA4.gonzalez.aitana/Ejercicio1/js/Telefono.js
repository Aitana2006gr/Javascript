//Clase Telefono, hereda de Dispositivo (Dispositivo es su clase padre)
function Telefono() {
    Dispositivo.call(this); //Llama al constructor padre

    //Valores por defecto
    this._pulgadas = 0;
    this._tipoPanel = 0;
    this._tiposPanelArr = ["OLED", "AMOLED", "QLED", "NanoCell"];
}

//Herencia del prototipo Dispositivo
Telefono.prototype = Object.create(Dispositivo.prototype);
Telefono.prototype.constructor = Telefono;

//Setters
Telefono.prototype.setPulgaddas = function(valor) {
    this._pulgadas = valor;
};

Telefono.prototype.setTipoPanel = function(tipo) {
    if (tipo < 0 || tipo > 3) {
        this._tipoPanel = 0;
    } else {
        this._tipoPanel = tipo;
    }
};

//Getters
Telefono.prototype.getPulgadas = function() {
    return this._pulgadas;
};

Telefono.prototype.getTipoPanel = function() {
    return this._tipoPanel;
};

Telefono.prototype.getTipoPanelTexto = function() {
    return this._tiposPanelArr[this._tipoPanel];
};

//Métodos
//Método toString para mostrar la información del telefono
Telefono.prototype.toString = function() {
    return (
        Dispositivo.prototype.toString.call(this) +
        `${this._pulgadas}; ${this._tipoPanel};`
    );
};

//Método verificarID que devuelve booleano y comprueba si la cadena comienza con "TELF -" comprobando que sea mayor o igual a 10 y menor o igual a 20
Telefono.prototype.verificarID = function(id) {
    if (!id.startsWith("TELF - ")) return false;
    return id.length >= 10 && id.length <= 20;
};
