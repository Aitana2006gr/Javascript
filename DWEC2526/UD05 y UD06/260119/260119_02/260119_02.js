window.onload = principal;

function principal() {
    // document.body.addEventListener("keydown", manejadorBody, false);
    // document.body.addEventListener("keyup", manejadorBody, false);
    //document.body.addEventListener("keypress", manejadorBody,false);
    document.body.addEventListener("keydown", manejadorTecla, false);
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

function manejadorTecla(e) {
    let tecla = e.code;
    let salida = document.getElementById("salida");

    if (e.type === "keydown") {
        if (e.code == "KeyA") {
            console.log(e.code)
            // salida.innerHTML = "Tecla: "+tecla;
        }

        if (e.code == "KeyB") {
            console.log(e.code)
            salida.innerHTML = "Tecla: " + tecla;
        }

        if (e.code == "KeyC") {
            console.log(e.code)
            salida.innerHTML = "Tecla: " + tecla;
            //document.querySelector("#salida").style.border = "10px solid black";
            salida.style.backgroundColor = "red";
            //salida.style.border="10px solid purple";
        }

        if (e.code == "KeyD") {
            console.log(e.code)
            salida.innerHTML = "Tecla: " + tecla;
        }

        if (e.code == "KeyA" && e.code == "AltLeft") {
            console.log(e.code)
            salida.innerHTML = "Ambas teclas presionadas";
        }
    } else if (e.type === "keyup") {
        console.warn("up");
    }
}



// document.getElementById("salida").innerHTML =
//     "Has escrito: " +
//     document.getElementById("entrada").value;

// // La mejor manera de cambiar el estilo desde código a un elemento es desde su atributoo style y el nombre del estilo a cambiar usando camelCase, en el que se eliminan los guiones y la letra inmediatamente siguiente a un guión se pone en mayúscula: background-color  --> backgroundColor
// document.querySelector("#salida").style.backgroundColor = "coral";
// //en css es background-color, pero al escribirlo en javascript, se usa el camel de bC
// // Ojo, que he usado dos formas distintas para acceder al elemento con id salida, pero si quería podría haber hecho lo siguiente:
// salida.style.border = "0.5vw dashed blue";

//onkeydown juegos mover en videojuegos
//onkeyup se detiene el movimiento en videojuegos
//keypress para recoger de mecanografia