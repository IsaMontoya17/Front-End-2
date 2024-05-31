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