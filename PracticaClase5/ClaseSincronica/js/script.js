
/* --------------------------- listado de almbumes --------------------------- */
const albumesFamosos = [{
    id: "x123",
    nombre: "Nevermind",
    imagen: "https://m.media-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg",
    like: false
},
{
    id: "y456",
    nombre: "Thriller",
    imagen: "https://img.discogs.com/LfnH5tbhcZ4xRMNLAodIyvea9xA=/fit-in/600x600/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-294033-1151290881.jpeg.jpg",
    like: true
},
{
    id: "z789",
    nombre: "The wall",
    imagen: "https://img.discogs.com/EbLYco6R1A-5Z7QJ4t4O1JSzsM8=/fit-in/587x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4620059-1370165707-3841.jpeg.jpg",
    like: false
},
{
    id: "a987",
    nombre: "Abbey Road",
    imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/RDH5EPH2TNENPI73NBWUWWMLPA.jpg",
    like: false
},
{
    id: "b654",
    nombre: "Origin of Symmetry",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_967206-MLA26105577132_102017-O.webp",
    like: false
},
{
    id: "c321",
    nombre: "Back in Black",
    imagen: "https://i1.wp.com/www.scienceofnoise.net/wp-content/uploads/2020/07/068660474366a63e1263e53ff370eb50.jpg",
    like: false
}
];



/* -------------------------------------------------------------------------- */
/*                  [1] FUNCION: captar el nombre de usuario                  */
/* -------------------------------------------------------------------------- */
//do while, prompt, innerText
function obtenerUsuario() {
const nombreUsuario = document.querySelector('#nombreUsuario');
let usuario = "";
// pedimos el nombre de usuario hasta que sea válido
do {
    usuario = prompt('Ingrese su nombre de usuario:');

} while (usuario === null || usuario === "" || usuario.length < 3);

// insertamos el nombre en el HTML
nombreUsuario.innerText = usuario;
}
// obtenerUsuario();

/* -------------------------------------------------------------------------- */
/*                [2] FUNCION: renderizar tarjetas del almbumes               */
/* -------------------------------------------------------------------------- */
//forEach, template strings, innerHTML
function renderizarAlbumes(listado) {
const covers = document.querySelector('.covers');
// nos aseguramos de vaciar el contenedor antes de insertar nuevos elementos
covers.innerHTML = '';

// recorremos el listado e insertamos en el HTML a traves de las plantillas literales
listado.forEach((album) => {
    covers.innerHTML += `
<li data-id="${album.id}">
    <img src="${album.imagen}" alt="${album.nombre}">
    <p>${album.nombre}</p>
    <i id="${album.id}" class="fa fa-heart ${album.like ? 'favorito' : ''}"></i>
</li>
`
})

};

renderizarAlbumes(albumesFamosos);

function mostrarDatosEnPerfil() {
    let cantFavoritos=0
    document.getElementById('cant-albums').textContent = (albumesFamosos.length > 1) ? `${albumesFamosos.length} álbumes` : `${albumesFamosos.length} album`;
    cantFavoritos = albumesFamosos.filter(album => album.like).length;
    document.getElementById('cant-favoritos').textContent = (cantFavoritos > 1) ? `${cantFavoritos} favoritos` : `${cantFavoritos} favorito`;
}

mostrarDatosEnPerfil();
