function capturarDatosFormulario() {
    // 👇 establecemos un objeto vacío para despues rellenarlo
    const obejetoInformacion = {
        nombre: "",
        password: "",
        telefono: "",
        hobbies: [],
        nacionalidad: ""
    } 

    const nom = document.querySelector('#nom');
    const pass = document.querySelector('#pass');
    const tel = document.querySelector('#tel');
    const hobbies = document.querySelectorAll('[name=hobbies]');
    const nacionalidad = document.querySelectorAll('[name=nacionalidad]');

    obejetoInformacion.nombre = nom.value;
    obejetoInformacion.password = pass.value;
    obejetoInformacion.telefono = tel.value;

    // recorremos los checkbox
    hobbies.forEach(hobbie => {
        // cada hobbie seleccionado lo sumamos al listado
        if (hobbie.checked) {
            obejetoInformacion.hobbies.push(hobbie.id)
        }
    });

    // recorremos los radio
    nacionalidad.forEach(nacion => {
        // la nacionalidad seleccionada es la que se guarda en el objeto
        if (nacion.checked) {
            obejetoInformacion.nacionalidad = nacion.id;
        }
    })

    return obejetoInformacion;
};

const form = document.querySelector('form');

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const datos = capturarDatosFormulario();
    console.log(datos);


    const errores = validarInformacion(datos);
    console.log(errores);

    // mostramos los errores presentes
    renderizarErrores(errores);

    // mostramos mensaje de exito si no hay errores
    mostrarMensajeExito(errores);
});


function validarInformacion(usuario) {
    let errores = [];
    const textoRegex = /^[a-zA-Z\s]+$/;
    const contrasenaRegex = /^\S+$/;

    if(!textoRegex.test(usuario.nombre) && usuario.nombre.lenght < 3){
        errores.push("El nombre debe contener al menos 3 caracteres")
    }
    if(!contrasenaRegex.test(usuario.password) || usuario.password.lenght < 6){
        errores.push("La contraseña debe tener al menos 6 caracteres, entre letras y símbolos.")
    }
    if(usuario.telefono.lenght < 10){
        errores.push("No es un teléfono válido.")
    }
    if(usuario.hobbies.lenght > 4){
        errores.push("Sólo es posible seleccionar 4 hobbies.")
    }
    if (usuario.nacionalidad.trim() === "") {
        errores.push("Debe seleccionar una nacionalidad.")
    }

    return errores;
}

function renderizarErrores(listado) {
    const cajaErrores = document.querySelector('#errores');

    if (cajaErrores) {
        cajaErrores.remove();
    }

    if (listado.length > 0) {
        const divTemplate = document.createElement('div');
        divTemplate.setAttribute('id', 'errores');
        divTemplate.style = "background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0;";
        listado.forEach(error => {
            divTemplate.innerHTML += `<p><small>${error}</small></p>`
        });

        form.appendChild(divTemplate);
    }
}

function mostrarMensajeExito(listado) {
    if (listado.length === 0){
        const divTemplate = document.createElement('div');
        divTemplate.style = "background:rgba(0, 255, 0, 0.2);padding:.5em 1em;color: green;margin: .5em 0;";
        divTemplate.innerHTML += `<p><small>¡Formulario completado con éxito!</small></p>`;
        form.appendChild(divTemplate);

        let boton = document.querySelector("button");
        const preventDefaultHandler = function(e) {
            e.preventDefault();
        };
        boton.addEventListener('click', preventDefaultHandler);

        setTimeout(function() {
            form.reset();
            form.removeChild(divTemplate);
            boton.removeEventListener('click', preventDefaultHandler); 
        }, 4000);
    }
}
