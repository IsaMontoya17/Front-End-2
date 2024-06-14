// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const token = localStorage.getItem("jwt");
if (!token) {
  location.replace("./index.html");
}

// CARGA DE TAREAS
window.addEventListener("load", function () {

  const btnCerrarSesion = document.querySelector("#closeApp");
  const formCrearTarea = document.forms[0];
  const urlUser = "https://todo-api.digitalhouse.com/v1/users/getMe";
  const urlTask = "https://todo-api.digitalhouse.com/v1/tasks";

  obtenerNombreUsuario();
  consultarTareas();


  btnCerrarSesion.addEventListener("click", function () {
    const cerrarSesion = confirm("Estas seguro que quieres salir?");
    if (cerrarSesion) {
      localStorage.removeItem("jwt");
      setTimeout(() => {
        location.replace("./index.html");
      }, 2000);
    }
  });

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(urlUser, settings)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userInfo = document.querySelector(".user-info p");
        userInfo.innerText = data.firstName;
      })
      .catch((err) => console.log(err));
  }

  function consultarTareas() {
    fetch(urlTask, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        limpiarTareas();
        renderizarTareas(data);
        botonesCambioEstado();
      })
      .catch((err) => console.log(err));
  }

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();
    let tarea = document.getElementById('nuevaTarea').value

    if (!tarea) {
      alert("Por favor, escribe una tarea antes de enviarla.");
      return;
    }
    const settings = {
      method: "POST",
      body: JSON.stringify({ description: tarea }),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };
    fetch(urlTask, settings)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        formCrearTarea.reset();
        consultarTareas();
      })
      .catch((err) => console.log(err));
  });

  function renderizarTareas(listado) {
    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");

    const nroFinalizadas = document.querySelector("#cantidad-finalizadas");
    let contador = 0;
    nroFinalizadas.innerText = contador;

    listado.forEach((tarea) => {
      const fecha = new Date(tarea.createdAt);
      if (tarea.completed) {
        contador++;
        tareasTerminadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `;
      } else {
        tareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${
              tarea.id
            }"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        `;
      }
    });
    nroFinalizadas.innerText = contador;
    agregarEventListenersBorrarTarea();
  }

  function limpiarTareas() {
    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";
  }

  function botonesCambioEstado() {
    const btnModificarTarea = document.querySelectorAll(".change");
    console.log(btnModificarTarea);
    btnModificarTarea.forEach(element => {
      element.addEventListener("click", function () {
        let completed;
        if (element.classList.contains("incompleta")) {
          element.classList.remove("incompleta");
          completed = false;
        } else {
          element.classList.add("incompleta");
          completed = true;
        }

        const settings = {
          method: "PUT",
          body: JSON.stringify({ description: element.description, completed: completed }),
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        };
        fetch(urlTask + "/" + element.id, settings)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            limpiarTareas();
            consultarTareas();
          })
          .catch((err) => console.log(err));
      });
    });
  }

  function agregarEventListenersBorrarTarea() {
    const btnBorrarTarea = document.querySelectorAll(".borrar");
    btnBorrarTarea.forEach((button) => {
      button.addEventListener("click", function () {
        const taskId = this.id;
        botonBorrarTarea(taskId);
      });
    });
  }
  function botonBorrarTarea(taskId) {
    const settings = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };

    fetch(urlTask + "/" + taskId, settings)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error al borrar la tarea");
      })
      .then((data) => {
        console.log(data);
        limpiarTareas();
        consultarTareas();
      })
      .catch((err) => console.log(err));
  }



});