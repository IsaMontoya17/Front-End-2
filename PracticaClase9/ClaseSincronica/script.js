/* -------------------------- estado por defecto ------------------------- */
const estadoUsuario = {
    email: "",
    password: "",
    rol: "",
    terminos: false
};

// ponemos en true solo cuando estén correctos
const estadoErroresOK = {
    email: false,
    password: false,
    rol: false,
    terminos: false
};

/* ---------------------------------- nodos --------------------------------- */

// capturamos todos los elementos que necesitamos
const formulario = document.forms[0];

const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputRol = document.querySelector('#rol');
const inputTerminos = document.querySelector('#terminos');

const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const rolError = document.querySelector('#rolError');
const terminosError = document.querySelector('#terminosError');


/* -------------------------------------------------------------------------- */
/*                   [1] FUNCION: mostrar errores al usuario                  */
/* -------------------------------------------------------------------------- */
function mostrarErrores() {
    // por cada small mostramos u ocultamos el error
    estadoErroresOK.email ? emailError.classList.remove('visible') : emailError.classList.add('visible');

    estadoErroresOK.password ? passwordError.classList.remove('visible') : passwordError.classList.add('visible');

    estadoErroresOK.rol ? rolError.classList.remove('visible') : rolError.classList.add('visible');

    estadoErroresOK.terminos ? terminosError.classList.remove('visible') : terminosError.classList.add('visible');
}

/* -------------------------------------------------------------------------- */
/*               [2] FUNCION: actulizamos los estados de la app               */
/* -------------------------------------------------------------------------- */

// 👇 por cada cambio en el formulario actualizamos
formulario.addEventListener('change', function () {

    // 👇 actualizo el estado de la pantalla con los datos
    estadoUsuario.email = inputEmail.value;
    estadoUsuario.password = inputPassword.value;
    estadoUsuario.rol = inputRol.value;
    estadoUsuario.terminos = inputTerminos.checked;

    // 👇 actualizo el estado del error segun el estado del usuario
    estadoErroresOK.email = validarEmail(estadoUsuario.email);
    estadoErroresOK.password = validarPassword(estadoUsuario.password);
    estadoErroresOK.rol = validarRol(estadoUsuario.rol);
    estadoErroresOK.terminos = validarTerminos(estadoUsuario.terminos);

    // finalmente muestro los errores presentes
    mostrarErrores();
});


/* -------------------------------------------------------------------------- */
/*                        [3] FUNCIONES: validar campos                       */
/* -------------------------------------------------------------------------- */
function validarEmail(email) {
    let resultado = false;

    // // EJEMPLO VALIDACIÓN A MANO 👇
    // if (email.includes('@') && email.includes('.') && !email.includes(' ') && email.length > 5) {
    //     resultado = true;
    // } 

    // EJEMPLO CON EXPRESION REGULAR 👇
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (regex.test(email)) {
        resultado = true;
    }

    return resultado;
}

function validarPassword(password) {
    let resultado = false;

    // si pasa las pruebas lo damos por válido 👇
    if (password.length > 5 && !password.includes(' ')) {
        resultado = true;
    }

    return resultado;
}

function validarRol(rol) {
    let resultado = false;

    // si pasa las pruebas lo damos por válido 👇
    if (rol === "frontend" || rol === "backend") {
        resultado = true;
    }

    return resultado;
}

function validarTerminos(verificacion) {
    let resultado = false;

    // si pasa las pruebas lo damos por válido 👇
    if (verificacion) {
        resultado = true;
    }

    return resultado;
}


/* -------------------------------------------------------------------------- */
/*                      [4] FUNCION: escuchamos el submit                     */
/* -------------------------------------------------------------------------- */

// en el evento submit nos remitimos a chequear nuestro estado de errores
formulario.addEventListener('submit', function (evento) {
    // prevenimos el default para manejar nososotro el comportamiento
    evento.preventDefault();

    console.log(estadoUsuario);
    console.log(estadoErroresOK);

    if (estadoErroresOK.email && estadoErroresOK.password && estadoErroresOK.rol && estadoErroresOK.terminos) {
        navegarPaginaExito()
    }

});

function navegarPaginaExito() {
    localStorage.setItem('user', JSON.stringify(estadoUsuario));
    const formButton = formulario.querySelector('button[type="submit"]')
    formButton.disabled = true
    formButton.textContent = 'Cargando...'

    setTimeout(function() {
        location.href = './usuario.html';
        location.replace(`usuario.html`)
    }, 3000);
}

/* -------------------------------------------------------------------------- */
/*           [6] FUNCION: Escuchamos el evento de carga de la página          */
/* -------------------------------------------------------------------------- */
window.addEventListener('load', function () {

    const user = recuperarDataStorage();
    renderizarElementos(user);

})

/* -------------------------------------------------------------------------- */
/*                 [7] FUNCION: Recuperar la info del storage                 */
/* -------------------------------------------------------------------------- */
function recuperarDataStorage() {
    const datosEnJSON = localStorage.getItem('user');

    const datosParseados = JSON.parse(datosEnJSON);

    return datosParseados;
}


/* -------------------------------------------------------------------------- */
/*                [8] FUNCION: Renderizamos la info en pantalla               */
/* -------------------------------------------------------------------------- */
function renderizarElementos(objeto) {
    // capturamos los nodos
    const email = document.querySelector('#email');
    const perfil = document.querySelector('#perfil');

    email.innerText = objeto.email;
    perfil.innerText = objeto.rol;
}


/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                     [9] FUNCION: Boton de cerrar sesion                    */
/* -------------------------------------------------------------------------- */
// Ahora vamos a crear elementos en el DOM dinamicamente y le asignaremos a esos elementos la escucha de eventos.
// ☝ La funcion debe ser ejecutada al final del evento Load.
// La idea es crear un boton para cerrar sesión. Entonce necesitamos cumplir los siguientes puntos:
// 1- Crear un elemento <button>
// 2- Que ese botón tenga el texto "Cerrar sesión"
// 3- El boton tiene que tener ciertos estilos:
//     - padding arriba y abajo de 5px y a los costados 20px
//     - color de fondo rojo con transparencia: rgba(255,0,0,0.2)
//     - color de letra rojo
//     - margenes a todos los lados de 20px
//     - ningún borde
//     - cursor de tipo pointer
// 4- Tenemos que agregar el botón en pantalla, adentro del div con la clase 'user', al final del mismo
// 5- El botón debe reaccionar cuando se le hace click
// 6- Mediante el click debe aparecer un cuadro de confirmación que pregunte: "¿Seguro desea cerrar sesión?"
// 7- Si el usuario acepta debe borrar todo el storage y redirigirlo a la pantalla de Login.

function botonCerrarSesion() {
    let botonCerrarSesion = document.createElement('button')
    botonCerrarSesion.innerText = "Cerrar sesión"
    botonCerrarSesion.style.padding = "5px 20px"
    botonCerrarSesion.style.backgroundColor = "rgba(255,0,0,0.2)"
    botonCerrarSesion.style.color = "red"
    botonCerrarSesion.style.margin = "20px"
    botonCerrarSesion.style.border = "none"
    botonCerrarSesion.style.cursor = "pointer"

    let divUser = document.querySelector('.user')
    divUser.appendChild(botonCerrarSesion)

    botonCerrarSesion.addEventListener('click', function(){
        let resp = confirm("¿Seguro desea cerrar sesión?")
        if(resp){
            localStorage.clear()
            location.href = 'index.html'
        }
    })
}

window.addEventListener('load', function(){
    botonCerrarSesion()
})
