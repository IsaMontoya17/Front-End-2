
// Esta API tiene su documentación en: https://jsonplaceholder.typicode.com/

function consultaApi(endpoint) {
    fetch(endpoint + "?_limit=10")
        .then(objetoRespuesta => {
            if (!objetoRespuesta.ok) {
                throw new Error('Network response was not ok ' + objetoRespuesta.statusText);
            }
            return objetoRespuesta.json();
        })
        .then(datosJs => {
            console.log(datosJs);
            renderizarElementos(datosJs);
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
                footer: `No se pudieron obtener los comentarios`,
            });
        })
        .finally(() => {
            const button = document.querySelector(".mostrar button");
            button.remove();
        });
}


const boton = document.querySelector('button');
const endpoint = 'https://jsonplaceholder.typicode.com/comments';

boton.addEventListener('click', function () {
    console.log("Clink para ver comentarios...");

    consultaApi(endpoint);
})

function renderizarElementos(listado) {
    const comentarios = document.querySelector('.comentarios');

    comentarios.innerHTML = listado.map(item => {
        return `<div class="comentario">
                    <h4>${item.email}</h4>
                    <p>${item.body}</p>
                </div>`
    }).join('');
}
