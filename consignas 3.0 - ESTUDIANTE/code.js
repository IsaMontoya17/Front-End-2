/* --------------------------- NO TOCAR DESDE ACÁ --------------------------- */
let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

const listado = [{
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://jherax.files.wordpress.com/2018/08/javascript_logo.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];

const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-materias");
const verMasBtn = document.querySelector("#ver-mas");
const cambiarTema = document.querySelector('#cambiar-tema');

profileBtn.addEventListener("click", renderizarDatosUsuario);
materiasBtn.addEventListener("click", recorrerListadoYRenderizarTarjetas);
cambiarTema.addEventListener("click", alternarColorTema);
/* --------------------------- NO TOCAR HASTA ACÁ --------------------------- */

function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
  let nombreUsuario, anioNacimientoUsuario, ciudadUsuario, respUsuario
  const nombreCiudadRegex = /^[a-zA-Z\s]+$/;
  const anioNacimientoRegex = /^(19[0-9][0-9]|20[0-2][0-9]|2030)$/;

  while (!nombreUsuario || !nombreCiudadRegex.test(nombreUsuario) || nombreUsuario.trim() === "") {
    nombreUsuario = prompt("Ingresa tu nombre");
    if (!nombreUsuario || !nombreCiudadRegex.test(nombreUsuario) || nombreUsuario.trim() === "") {
      alert("Por favor, ingresa un nombre válido.");
    }
  }

  while (!anioNacimientoUsuario || !anioNacimientoRegex.test(anioNacimientoUsuario)) {
    anioNacimientoUsuario = prompt("Ingresa el año en que naciste");
    if (!anioNacimientoUsuario || !anioNacimientoRegex.test(anioNacimientoUsuario)) {
      alert("Por favor, ingresa un año válido (entre 1900 y 2030).");
    }
  }

  while (!ciudadUsuario || !nombreCiudadRegex.test(ciudadUsuario) || ciudadUsuario.trim() === "") {
    ciudadUsuario = prompt("Ingresa la ciudad donde vives");
    if (!ciudadUsuario || !nombreCiudadRegex.test(ciudadUsuario) || ciudadUsuario.trim() === "") {
      alert("Por favor, ingresa una ciudad válida.");
    }
  }

  respUsuario = confirm("Te interesa Javascript?")

  datosPersona.nombre = nombreUsuario;
  datosPersona.edad = new Date().getFullYear() - parseInt(anioNacimientoUsuario);
  datosPersona.ciudad = ciudadUsuario;
  datosPersona.interesPorJs = respUsuario ? "Sí" : "No";

  console.log(datosPersona);
}

function renderizarDatosUsuario() {
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
  document.getElementById('nombre').innerText = datosPersona.nombre
  document.getElementById('edad').innerText = datosPersona.edad
  document.getElementById('ciudad').innerText = datosPersona.ciudad
  document.getElementById('javascript').innerText = datosPersona.interesPorJs

}


function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
  let fila = document.getElementById('fila')
  if (fila.getAttribute("data-loaded") === "true") return;

  listado.forEach(materia => {
    let card = document.createElement('div')
    card.classList.add('caja')

    let img = document.createElement('img')
    img.setAttribute("src", materia.imgUrl)

    let p1 = document.createElement('p')
    p1.innerText = `Lenguajes: ${materia.lenguajes}`

    let p2 = document.createElement('p')
    p2.innerText = `Bimestre: ${materia.bimestre}`

    card.appendChild(img)
    card.appendChild(p1)
    card.appendChild(p2)

    fila.appendChild(card)
    fila.setAttribute("data-loaded", "true")
  });
}

function alternarColorTema() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  let sitio = document.querySelector("#sitio")
  sitio.classList.toggle('dark')
}

/* --------------------- PUNTO 5: Escribe tu codigo aqui --------------------- */
document.addEventListener('keypress', function(e){
  if(e.key==='f'){
    let p = document.querySelector(".oculto")
    p.classList.remove('oculto')
  }
})
