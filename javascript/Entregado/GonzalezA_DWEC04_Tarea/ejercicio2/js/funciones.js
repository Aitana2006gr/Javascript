//AITANA GÓNZÁLEZ RODRÍGUEZ
//FUNCIONES para el script del ejercicio 2

//Función mostrarError(): Muestra un mensaje de error dentro de la división "salida"
export function mostrarError(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML = `<div style="color:red">ERROR: No se ha podido crear la matriz: ${mensaje}</div>`;
}

//Función mostrarMensaje(): Muestra mensajes informativos en la salida
export function mostrarMensaje(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML = `<div>${mensaje}</div>`;
}