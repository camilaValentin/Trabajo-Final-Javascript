/* SISTEMA DE MANEJO DE RESERVAS INTERNO DE UN RESTAURANTE */

let reservas = [];
let opcion;
let confirmacion;
let nombre;
let indice;

function menuOpciones() {
    let opcion = parseInt(prompt("MILO RESTO\n\nMENÚ DE OPCIONES\n1.Agendar una reserva\n2.Consultar reservas\n3.Modificar una reserva\n4.Cancelar una reserva\n0.Salir"));
    return opcion
}
function busquedaConNombre(nombre) {
    for (const reserva of reservas) {
        if (reserva.nombre === nombre) {
            return reserva;
        }
    }
    return -1;
}
function nuevaReserva() {
    confirmacion = true
    while (confirmacion) {
        let nombre = prompt("MILO RESTO\n\nIngrese el nombre de la persona");
        let cantidadPersonas = prompt("MILO RESTO\n\nIngrese la cantidad de personas");
        let fecha = prompt("MILO RESTO\n\nIngrese la fecha (formato dd/mm/aaa)");
        reservas.push({ nombre, cantidadPersonas, fecha })
        alert("MILO RESTO\n\nSe ingresó una reserva a nombre de " + nombre + " para " + cantidadPersonas + " personas el dia " + fecha)
        confirmacion = confirm("Desea ingresar otra reserva?")
    }
}
function mostrarReservas() {
    if (reservas.length === 0) {
        alert("No hay reservas")
    } else {
        for (const reserva of reservas) {
            alert("MILO RESTO\n\nFecha: " + reserva.fecha + "\nNombre: " + reserva.nombre + "\nCantidad de personas: " + reserva.cantidadPersonas + "\n")
        }
    }
}
function mensajeModificacion(reserva) {
    alert("MILO RESTO\n\nSe modificó correctamente la reserva\nFecha: " + reserva.fecha + "\nNombre: " + reserva.nombre + "\nCantidad de personas: " + reserva.cantidadPersonas);
}
function modificarFecha(reserva) {
    let fechaNueva = prompt("MILO RESTO\n\nIngrese la fecha nueva (formato dd/mm/aaa)");
    reserva.fecha = fechaNueva;

}
function modificarCantidad(reserva) {
    let cantidadNueva = parseInt(prompt("MILO RESTO\n\nIngrese la cantidad de personas nueva"));
    reserva.cantidadPersonas = cantidadNueva
}
function modificarNombre(reserva) {
    let nombreNuevo = prompt("Ingrese el nombre nuevo");
    reserva.nombre = nombreNuevo;
}
function modificarReserva() {
    confirmacion = true;
    nombre = prompt("MILO RESTO\n\nIngrese el nombre de la reserva a modificar");
    let reserva = busquedaConNombre(nombre);
    if (reserva === -1) {
        alert("MILO RESTO\n\n" + nombre + " no se encuentra en la lista de reservas");
    } else {
        while (confirmacion) {
            opcion = parseInt(prompt("MILO RESTO\n\nQue deseas cambiar?\n1.Fecha\n2.Nombre\n3.Cantidad de personas"));
            switch (opcion) {
                case 1:
                    modificarFecha(reserva);
                    break;
                case 2:
                    modificarNombre(reserva);
                    break;
                case 3:
                    modificarCantidad(reserva);
                    break;
                default:
                    alert("MILO RESTO\n\nOpción incorrecta")
                    break;
            }
            mensajeModificacion(reserva);
            confirmacion = confirm("MILO RESTO\n\nDeseas hacer otra modificación a esta reserva?")
        }
    }

}
function eliminarReserva() {
    nombre = prompt("MILO RESTO\n\nIngrese el nombre de la reserva a cancelar");
    let reserva = busquedaConNombre(nombre);
    if (reserva === -1) {
        alert("MILO RESTO\n\n" + nombre + " no se encuentra en la lista de reservas");
    } else {
        indice = reservas.indexOf(reserva);
        reservas.splice(indice, 1);
        alert("MILO RESTO\n\nSe canceló la reserva a nombre de " + nombre);
    }
}

while (opcion !== 0) {
    opcion = menuOpciones();
    switch (opcion) {
        case 0:
            alert("MILO RESTO\n\nPrograma terminado")
            break;
        case 1:
            nuevaReserva();
            break;
        case 2:
            mostrarReservas();
            break;
        case 3:
            modificarReserva();
            break;
        case 4:
            eliminarReserva();
            break;
        default:
            alert("MILO RESTO\n\nOpción incorrecta")
            break;
    }
}