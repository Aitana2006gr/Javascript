//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que crea y muestra los objetos con herencia por prototipos.

//Hago el import de las funciones del ejercicio5 a este script principal
import { Electrodomestico, Lavadora, mostrarError, mostrarMensaje } from "./funciones.js";

// Función auxiliar para añadir contenido a la división 'salida' (no reemplaza el contenido).
// NOTA: Esta función se define localmente aquí para asegurar que los mensajes se concatenen.
function mostrar(mensaje) {
    const salida = document.getElementById("salida");
    // Usamos += para añadir nuevo contenido
    salida.innerHTML += `<div>${mensaje}</div>`;
}

//Cuando la página HTML ha cargado completamente, se ejecuta la función principal
document.addEventListener("DOMContentLoaded", principal);


//---------------------------------------------------------
// FUNCIÓN PRINCIPAL
// Crea y testea las instancias de Electrodomestico y Lavadora
//---------------------------------------------------------
function principal() {
    
    // --------------------------------------
    // 1. DEMOSTRACIÓN DE ELECTRODOMESTICO
    // --------------------------------------
    
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE ELECTRODOMESTICO</h3>");
    
    const e = new Electrodomestico();
    mostrar("<strong>Electrodoméstico 1 creado con valores por defecto:</strong>");
    mostrar(e.toString()); // Muestra: ELEC: NOID; NOMOD; 1;
    
    // Asignamos valores válidos (cumpliendo las validaciones)
    e.ID = "ELEC - ABC123";
    e.Modelo = "MODELOX"; // Longitud >= 6
    e.Consumo = 4; // Entero >= 1
    
    mostrar("<br><strong>Electrodoméstico 1 actualizado:</strong>");
    mostrar(e.toString()); // Muestra los valores actualizados
    
    // Prueba del cálculo de consumo
    mostrar(`Consumo 3 horas → ${e.calcularConsumo(3)} kW (4 kW/h * 3 h)`);

    // Prueba de validaciones fallidas (el objeto NO cambia)
    e.Consumo = 0.5; // Falla (no es entero >= 1)
    e.Modelo = "MOD"; // Falla (longitud < 6)
    mostrar("<br><strong>Después de intentos de asignación fallidos:</strong>");
    mostrar(e.toString()); // El Consumo y el Modelo siguen siendo 4 y MODELOX

    
    // --------------------------------------
    // 2. DEMOSTRACIÓN DE LAVADORA
    // --------------------------------------
    
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE LAVADORA (HERENCIA)</h3>");
    
    const l = new Lavadora();
    
    // Asignamos valores del padre (Electrodomestico)
    l.ID = "ELEC - LAV01";
    l.Modelo = "LAVAMAX";
    l.Consumo = 5; 
    
    // Asignamos valores propios de Lavadora
    l.Capacidad = 8; 
    l.BajoConsumo = true; // Activa el descuento del 50%
    l.TipoCarga = 1; // 1 = Lateral
    
    mostrar("<strong>Lavadora 1 creada:</strong>");
    mostrar(l.toString()); // Llama al toString() sobrescrito
    mostrar(`Tipo de carga textual: <strong>${l.TipoCargaTexto}</strong>`);
    
    // Prueba de cálculo de consumo con BajoConsumo = true (debería ser 50% de 5*4 = 20)
    const consumo_con_descuento = l.calcularConsumo(4);
    mostrar(`Consumo 4 horas (Bajo Consumo) → ${consumo_con_descuento} kW (10 kW)`);

    // Prueba de cálculo de consumo sin BajoConsumo
    l.BajoConsumo = false;
    const consumo_sin_descuento = l.calcularConsumo(4);
    mostrar(`Consumo 4 horas (Sin Bajo Consumo) → ${consumo_sin_descuento} kW (20 kW)`);
    
    // Prueba de TipoCarga inválida
    l.TipoCarga = 99; // Inválido, debería resetear a 0
    mostrar("<br><strong>Prueba TipoCarga inválida (debe ser 0 'Indefinida'):</strong>");
    mostrar(`Tipo Carga: ${l.TipoCarga} (${l.TipoCargaTexto})<hr>`);
}