window.addEventListener("load", function () {

    const url = "https://todo-api.digitalhouse.com/v1/users/login";
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const pass = document.querySelector("#inputPassword");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = {
            email: email.value,
            password: pass.value,
        };
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        };
    realizarLogin(config);
    });

    function realizarLogin(settings) {
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