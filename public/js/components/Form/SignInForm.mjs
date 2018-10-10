'use strict'

import { Errors, ValidatorModule } from "../../modules/validation.js";
import { APIModule } from "../../modules/api.js";

const validator = new ValidatorModule;
const api = new APIModule;

export class SignInFormComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            headerForm: "Sign In",
            action: "/api/v1/session",
            method: "POST",
            classForm: "form__sign_in",
            fields: [
                { name: 'Login', type: 'text', className: 'form__input', errId: 'login_error' },
                { name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
                { name: 'Sign In', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        this._el.innerHTML += template;

        this.form = this._el.querySelector('.form__sign_in');
        this.form.addEventListener('submit', event => {
            this._submitForm(event)
        });
    }
    
    showServerError(errorMsg) {
        let errorEl = document.createElement("div");
        errorEl.className = "form__errorMessage";
        errorEl.innerText = errorMsg;
        this.form.insertBefore(errorEl, this.form.firstChild);
        setTimeout(() => {
            errorEl.parentNode.removeChild(errorEl);
        }, 3000);
    }

    _submitForm(event) {
        event.preventDefault();

        let login = this.form["Login"].value;
        let password = this.form["Password"].value;

        const validators = [
            { 
                func: validator.validateLogin, 
                parameter: login, 
                errors: [Errors.login.id, Errors.login.wrongFormat]
            },
            { 
                func: validator.validatePassword, 
                parameter: password, 
                errors: [Errors.password.id, Errors.password.wrongFormat] 
            },
        ];

        let validateCounter = 0;
        for (let i = 0; i < validators.length; i++) {
            if (!validators[i].func(validators[i].parameter)) {
                validator.addError(this.form, validators[i].errors[0], validators[i].errors[1]);
            } else {
                validator.addError(this.form, validators[i].errors[0]);
                validateCounter++;
            }
        }

        if (validateCounter == validators.length) {

            api.SignIn({ login: login, password: password })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem("login", login);
                    let event = new CustomEvent('successful_sign_in', { detail: { login: login } });
                    this.form.dispatchEvent(event);
                })
                .catch(error => {
                    let event = new CustomEvent('unsuccessful_sign_in', { detail: error });
                    this.form.dispatchEvent(event);
                });
        }
    }
}