function iniciarJuego() {
    let nombre = "";
    while (nombre.length < 3 || !/^[a-zA-Z]+$/.test(nombre)) {
        nombre = prompt("Ingrese su nombre por favor:");
        if (nombre.length < 3 || !/^[a-zA-Z]+$/.test(nombre)) {
            alert("El nombre debe contener al menos 3 letras y no debe contener números ni caracteres especiales.");
        }
    }
    alert("Gracias por jugar " + nombre.toUpperCase() + ". ¡Mucha suerte!");

    console.log("----------------------------");
    console.log("El jugador es:")
    console.log(nombre.toUpperCase());
    console.log("----------------------------");

    return nombre.toUpperCase();
}

const nombreJugador = iniciarJuego();
