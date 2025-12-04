//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que crea y muestra objetos con clases

//Hago el import de las funciones del ejercicio a este script principal
import { Electrodomestico, Lavadora, mostrarError, mostrarMensaje } from "./funciones.js";

// Función auxiliar para añadir contenido a la división 'salida'.
function mostrar(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML += `<div>${mensaje}</div>`;
}

//Cuando la página carga
document.addEventListener("DOMContentLoaded", principal);


//---------------------------------------------------------
// FUNCIÓN PRINCIPAL
// Crea y testea las instancias de Electrodomestico y Lavadora.
//---------------------------------------------------------
function principal() {

    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE ELECTRODOMESTICO (ES6)</h3>");

    // 1. DEMOSTRACIÓN DE ELECTRODOMESTICO
    const e = new Electrodomestico();
    mostrar("<strong>Electrodoméstico 1 creado con valores por defecto:</strong>");
    mostrar(e.toString());

    // Asignamos valores
    e.ID = "ELEC - ABC321";
    e.Modelo = "MODERNOX";
    e.Consumo = 6;

    mostrar("<br><strong>Electrodoméstico 1 actualizado:</strong>");
    mostrar(e.toString());
    mostrar(`Consumo 2 horas → ${e.calcularConsumo(2)} kW (6 kW/h * 2 h)`);

    // 2. DEMOSTRACIÓN DE LAVADORA
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE LAVADORA (HERENCIA ES6)</h3>");

    const l = new Lavadora();

    // Asignamos valores heredados
    l.ID = "ELEC - LAV02";
    l.Modelo = "LAVADORA";
    l.Consumo = 8;

    // Asignamos valores propios
    l.Capacidad = 10;
    l.BajoConsumo = true;
    l.TipoCarga = 2; // 2 = Superior

    mostrar("<strong>Lavadora 1 creada:</strong>");
    mostrar(l.toString());
    mostrar(`Tipo de carga textual: <strong>${l.TipoCargaTexto}</strong>`);

    // Prueba de cálculo de consumo con BajoConsumo = true (debería ser 50% de 8*5 = 40)
    const consumo_con_descuento = l.calcularConsumo(5);
    mostrar(`Consumo 5 horas (Bajo Consumo) → ${consumo_con_descuento} kW (20 kW)`);

    // Prueba de cálculo de consumo sin BajoConsumo
    l.BajoConsumo = false;
    const consumo_sin_descuento = l.calcularConsumo(5);
    mostrar(`Consumo 5 horas (Sin Bajo Consumo) → ${consumo_sin_descuento} kW (40 kW)<hr>`);
}