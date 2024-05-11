const sitio = document.querySelector('body');
const btnTema = document.querySelector('.tema button')
const menuItems =  document.querySelectorAll('nav li');
const contenedorNoticias = document.querySelector('main');
const articulos = document.querySelectorAll('article');
const titulos = document.querySelectorAll('article h2');

console.log(menuItems[0].style)

menuItems.forEach( item => {
    item.style.textTransform = "uppercase";
    item.style.color = "aqua";
    item.style.backgroundColor = "rgba(255,255,255,0.2";
    item.style.borderRadius = "50vh";
})

function elegirTema() {
    let resp = confirm("Desea usar modo oscuro?")
    if(resp){
        sitio.classList.add('dark')
        document.querySelector('button').textContent = 'Cambiar a modo claro 🌞';
    }
}
elegirTema();

function cambiarTema(){
    if(sitio.classList.contains('dark')){
        document.querySelector('button').innerText= 'Cambiar a modo claro 🌞'
    }else{
        document.querySelector('button').innerText= 'Cambiar a modo oscuro 🌛'
    }
    sitio.classList.toggle('dark')
}