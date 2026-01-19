window.onload = principal;

function principal() {
    document.body.addEventListener("keydown", manejadorBody, false);
    document.body.addEventListener("keyup", manejadorBody, false);
    //document.body.addEventListener("keypress", manejadorBody,false);

}

function manejadorBody(e) {
    if (e.type === "keydown") {
        console.log(e.code); //El codigo de la tecla: ejemplo Digit1, KeyB, KeyB ,Enter, ShiftRight (para ver que tecla física ha pulsado)
        console.log(e.key); //Es la tecla pulsada: 1, b, B, Enter, Shift (para ver el valor introducido)
        console.warn(e.altKey);
    } else if (e.type === "keyup") {
        console.warn("up");
    }
}

//onkeydown juegos mover en videojuegos
//onkeyup se detiene el movimiento en videojuegos
//keypress para recoger de mecanografia