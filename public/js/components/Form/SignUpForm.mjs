'use strict'

import { ValidatorModule } from "../../modules/validation.js";

const validator = new ValidatorModule;

export class SignUpFormComponent {
    constructor({ el = document.body, validateEmailFn, validatePasswordFn } = {}) {
        this._el = el;
        this._validateEmailFn = validateEmailFn;
        this._validatePasswordFn = validatePasswordFn;
    }

    render() {
        const data = { 
            headerForm: "Sign Up",
            action: "/sign_up",
            method: "POST",
            classForm: "form__sign_up",
            fields: [
                { name: 'First Name', type: 'text', className: 'form__input', errId: 'firstName_error' },
                { name: 'Last Name', type: 'text', className: 'form__input', errId: 'lastName_error' },
                { name: 'Email', type: 'email', className: 'form__input', errId: 'email_error' },
                { name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
                { name: 'Repeat Password', type: 'password', className: 'form__input', errId: 'rep_password_error' },
                { name: 'Sign Up', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        this._el.innerHTML += template;

        this._form = this._el.getElementsByClassName('form__sign_up')[0];
        this._form.addEventListener('submit', function () {
            this._submitForm(event)
        }.bind(this, event));
    }

    _submitForm(event) {
        event.preventDefault();

        this._email = this._form["Email"].value;
        this._password = this._form["Password"].value;
        this._repPassword = this._form["Repeat Password"].value;
        this._firstName = this._form["First Name"].value;
        this._lastName = this._form["Last Name"].value;

        // Нам ОЧЕНЬ СТЫДНО за следующие пару десятков строк кода:(((
        if (validator.validateEmail(this._email)) {
            this._addError("email_error");
            // POST
        } else {
            this._addError("email_error", "Wrong email format");
        }
        // Валидация всех полей
    }

    _addError(errId, msg = '') {
        const errDiv = this._form.children[errId];
        errDiv.innerHTML = msg;
    }
}