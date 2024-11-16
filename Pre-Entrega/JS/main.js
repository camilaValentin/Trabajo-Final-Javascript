let reservas = [];
let opcion;

function menuOpciones() {
    let opcion = parseInt(prompt("MILO RESTO\n\nMENÚ DE OPCIONES\n1.Agendar una reserva\n2.Consultar reservas\n0.Salir"));
    return opcion
}
function nuevaReserva() {
    let nombre = prompt("MILO RESTO\n\nIngrese el nombre de la persona");
    let cantidadPersonas = prompt("MILO RESTO\n\nIngrese la cantidad de personas");
    let fecha = prompt("MILO RESTO\n\nIngrese la fecha");
    reservas.push({ nombre, cantidadPersonas, fecha })
    alert("MILO RESTO\n\nSe ingresó una reserva a nombre de " + nombre + " para " + cantidadPersonas + " personas el dia " + fecha)
}
function mostrarReservas() {
    for (const reserva of reservas) {
        alert("MILO RESTO\n\nFecha: " + reserva.fecha + " Nombre: " + reserva.nombre + " Cantidad de personas: " + reserva.cantidadPersonas + "\n")
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
        default:
            alert("MILO RESTO\n\nOpción incorrecta")
            break;
    }
}