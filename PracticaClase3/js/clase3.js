// 👇Acá vemos que el document nos dá acceso a todo el DOM, ese arbol que contiene todos los nodos de nuestro sitio
console.log(document);

//titulo principal
const titulo = document.querySelector('h1');
console.log(titulo);

//li's👇
const itemsMenu = document.querySelectorAll('li');
console.log(itemsMenu);

//2do li
var listaItems = document.querySelectorAll('nav ul li');
var segundoLi = listaItems[1];
console.log(segundoLi)

//boton
const botonTema = document.querySelector('.tema #botonTema').innerText
console.log(botonTema)

// hacemos un selector más específico👇
const infoExtra = document.querySelector('.info .clima')
console.log(infoExtra);

//noticias
const articulos = document.querySelectorAll('article');
for (let i = 0; i < articulos.length; i++) {
    console.log(articulos[i]);
}

//titulos noticias
articulos.forEach( articulo =>{
    const titulo = articulo.querySelector('h2').innerText;
    console.log(titulo);
});
