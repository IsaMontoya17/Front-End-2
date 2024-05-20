const registerBtn = document.querySelector(".register-btn");

registerBtn.addEventListener("click", () => {

  let email = document.getElementById('email-input').value

  let password = document.getElementById('password-input').value

  let radioLegalAge = document.querySelector('input[name="legalAge"]:checked').value;
  
  let CheckboxTyc = document.getElementById('tyc-input').checked;

  if (radioLegalAge === 'false') {
    alert("Debes ser mayor de edad para registrarte en el sitio");
    return;
  }

  if (!CheckboxTyc) {
    alert("Debes aceptar los TyCs para registrarte en el sitio");
    return;
  }

  const userInfo = {
    email: email,
    password: password,
    isLegalAge: radioLegalAge === 'true',
    acceptedTermsAndConditions: CheckboxTyc
  };

  console.log('Información del usuario:', userInfo);

});
