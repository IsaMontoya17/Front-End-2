let edad = "";

while(isNaN(edad) || edad === null || edad === ""){
    edad = prompt("Ingrese su edad");
    edad = parseInt(edad);
}

if(edad > 18){
    console.log("Es mayor de edad");
} else {
    console.log("Es menor de edad");
}
