//Constante para el array de tipos de panel 
const tiposPanelArr = ["OLED", "AMOLED", "QLED", "NanoCell"];

//Clase Telefono, hereda de Dispositivo (Dispositivo es su clase padre)
function Telefono(_id, _autonomia, _carga, _pulgadas = 0, _tipoPanel = 0) {
    Dispositivo.call(this, _id, _autonomia, _carga); //Llama al constructor padre

    //Valores por defecto
    this._pulgadas = _pulgadas;
    this._tipoPanel = _tipoPanel;
    //this._tiposPanelArr = ["OLED", "AMOLED", "QLED", "NanoCell"]; No puedo definirla dentro del constructor, ya que de esta forma, estoy creando una copia pra cada instancia de Telefono.
    //El contenido es el mismo pero es susceptible a ser modificado en esa instancia. Por ello, para que la propiedad _tiposPanelArr no se pueda modificar, la defino como una constante del prototipo fuera del constructor 
}

//Herencia del prototipo Dispositivo
Telefono.prototype = Object.create(Dispositivo.prototype);
Telefono.prototype.constructor = Telefono;
//Añado la propiedad _tiposPanelArr
Telefono.prototype._tiposPanelArr = tiposPanelArr;

//Setters
Telefono.prototype.setPulgadas = function (valor) {
    //Asigna el valor a _pulgadas
    this._pulgadas = valor;
};

Telefono.prototype.setTipoPanel = function (tipo) {
    //Comprueba si el valor es menor que 0 o mayor que 3
    if (tipo < 0 || tipo > 3) {
        this._tipoPanel = 0; //Si no es así, se le asigna el valor 0
    } else {
        this._tipoPanel = tipo; //Sino se le asigna el nuevo valor
    }
};

//Getters
Telefono.prototype.getPulgadas = function () {
    //Devuelve el valor pulgadas
    return this._pulgadas;
};

Telefono.prototype.getTipoPanel = function () {
    //Devuelve el valor de la propiedad _tipoPanel
    return this._tipoPanel;
};

Telefono.prototype.getTipoPanelTexto = function () {
    //Devuelve el tipo de panel en formato texto, utiliza la propiedad _tipoPanel
    //como índice en el array _tiposPanelArr
    return this._tiposPanelArr[this._tipoPanel];
};

//Métodos
//Método toString que sobreescribe el método de la clase Dispositivo
Telefono.prototype.toString = function () {
    return (
        Dispositivo.prototype.toString.call(this) + //LLamo al metodo toString de la clase Dispositivo 
        `${this._pulgadas}; ${this._tipoPanel};` //Añado las otras propiedades a la cadena de texto
    );
};

//Método verificarID que que sobreescribe el método de la clase Dispositivo
Telefono.prototype.verificarID = function (id) {
    //Para comprobar si empieza con "TELF "
    if (!id.startsWith("TELF ")) {
        return false;
    }
    //para comprobar que debe tener el menos 10 chars y un máximo de 20 en total 
    if (id.length < 10 || id.length > 20) {
        return false;
    }
    //Si cumple ambas, devuelve true.
    return true;
};
