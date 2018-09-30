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
            action: "/api/v1/session ",
            method: "POST",
            classForm: "form__sign_in",
            fields: [
                { name: 'Email', type: 'email', className: 'form__input', errId: 'email_error' },
                { name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
                { name: 'Sign In', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        this._el.innerHTML += template;

        this.form = this._el.getElementsByClassName('form__sign_in')[0];
        this.form.addEventListener('submit', function() {
            this._submitForm(event)
        }.bind(this, event));
    }
    
    showServerError(errorMsg) {
        let errorEl = document.createElement("div");
        errorEl.className = "form__error_message";
        errorEl.innerText = errorMsg;
        this.form.insertBefore(errorEl, this.form.firstChild);
        setTimeout(function () {
            errorEl.parentNode.removeChild(errorEl);
        }, 3000);
    }

    _submitForm(event) {
        event.preventDefault();

        this._email = this.form["Email"].value;
        this._password = this.form["Password"].value;

        const validators = [
            { 
                func: validator.validateEmail, 
                parameter: this._email, 
                errors: [Errors.email.id, Errors.email.wrongFormat]
            },
            { 
                func: validator.validatePassword, 
                parameter: this._password, 
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
            let that = this;
            api.SignIn({ login: this._email, password: this._password })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function (data) {
                let event = new CustomEvent('successful_sign_in', { detail: data });
                that.form.dispatchEvent(event);
            })
            .catch(function (error) {
                let event = new CustomEvent('unsuccessful_sign_in', { detail: error });
                that.form.dispatchEvent(event);
            });
        }
    }
}