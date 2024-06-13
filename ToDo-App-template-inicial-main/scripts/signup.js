window.addEventListener('load', function () {

    const url = "https://todo-api.digitalhouse.com/v1/users";
    const form = document.forms[0];
    const nombre = document.querySelector("#inputNombre");
    const apellido = document.querySelector("#inputApellido");
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const passwordRepetida = document.querySelector("#inputPasswordRepetida");

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = {
            firstName: nombre.value,
            lastName: apellido.value,
            email: email.value,
            password: password.value,
        };
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        };
    realizarRegister(config);
    });

    function realizarRegister(settings) {
        fetch(url, settings)
            .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                setTimeout(() => {
                location.replace("./mis-tareas.html");
                }, 1000);
            }
        })
        .catch((err) => console.log(err));
    }

});