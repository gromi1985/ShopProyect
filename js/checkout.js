
const formulario = document.getElementsByClassName("form");
const inputsField = document.querySelectorAll(".form div input");


const expresiones = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letrasy espacios, pueden llevar acentos
    lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /(?=\w*\d)(?=\w*[A-Za-z])\S{3,12}$/, // 3 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phoneNo: /^\d{3,14}$/, // 3 a 14 numeros.
    address: /^[#.0-9a-zA-Z\s,-]+$/ //simple address
}

const campos = {
    firstName: false,
    lastName: false,
    password: false,
    email: false,
    phoneNo: false
}



// Get the input fields
var password = document.querySelector(".password");
var phone = document.querySelector('.phone');
var name = document.querySelector('.name');

// Get the error elements
var errorPassword = document.getElementById("errorPassword");
var errorName = document.getElementById('errorName');
var errorPhone = document.getElementById('errorPhone');

// Exercise 8

// Validate fields entered by the user: name, phone, password, and email
//Valido los campos a medida que se van rellenando
const validarFormulario = (e) => {
    switch (e.name) {
        case 'firstName':
            validarCampo(expresiones.firstName, e, 'firstName');
            break;
        case 'lastName':
            validarCampo(expresiones.lastName, e, 'lastName');
            break;
        case "password":
            validarCampo(expresiones.password, e, 'password');
            break;
        case "email":
            validarCampo(expresiones.email, e, 'email');
            break;
        case "phoneNo":
            validarCampo(expresiones.phoneNo, e, 'phoneNo');
            break;
    }
}

const validarCampo = (expresion, input,campo) => {
    if (expresion.test(input.value) ) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
}


//Valido los campos que no != vacio cuando se realiza el submit
const validarEmptyFields = (input) => {
    if (input.value === '') {
        document.getElementById(`grupo__${input.name}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${input.name} .formulario__input-error`).innerHTML='This field can not empty';
        document.querySelector(`#grupo__${input.name} .formulario__input-error`).classList.add('formulario__input-error-activo');
        return false;
    }
    else 
        return true;
}

const validarSizeFields = (input) => {
    if (input.value.length < 3) {
        document.getElementById(`grupo__${input.name}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${input.name} .formulario__input-error`).innerHTML='Minimum number of characters is 3';
        document.querySelector(`#grupo__${input.name} .formulario__input-error`).classList.add('formulario__input-error-activo');
        return false;
    }
    else 
        return true;
}

function validate() {
    inputsField.forEach((input) => {
        if(validarEmptyFields(input))
         if (validarSizeFields(input))
             validarFormulario(input);
    });

return false;
}