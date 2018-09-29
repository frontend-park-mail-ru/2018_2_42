'use strict'

import { Errors, ValidatorModule } from "../../modules/validation.js";
import { APIModule } from "../../modules/api.js";

const validator = new ValidatorModule;
const api = new APIModule;

export class SignUpFormComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            headerForm: "Sign Up",
            action: "/sign_up",
            method: "POST",
            classForm: "form__sign_up",
            fields: [
                // { name: 'First Name', type: 'text', className: 'form__input', errId: 'firstName_error' },
                // { name: 'Last Name', type: 'text', className: 'form__input', errId: 'lastName_error' },
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
        // this._firstName = this._form["First Name"].value;
        // this._lastName = this._form["Last Name"].value;

        const validators = [
            { 
                func: validator.validateEmail, 
                parameter: this._email, 
                errors: [Errors.email.id, Errors.email.wrongFormat]
            },
            { 
                func: validator.validatePassword, 
                parameter: this._password, 
                errors: [Errors.password.id, Errors.password.minLength] 
            },
            { 
                func: validator.validateRepPassword, 
                parameter: [this._password, this._repPassword], 
                errors: [Errors.repPassword.id, Errors.repPassword.doNotMatch] 
            },
            // { 
            //     func: validator.validateFirstName, 
            //     parameter: this._firstName, 
            //     errors: [Errors.firstName.id, Errors.firstName.required] 
            // },
            // { 
            //     func: validator.validateLastName, 
            //     parameter: this._lastName, 
            //     errors: [Errors.lastName.id, Errors.lastName.required] 
            // },
        ];

        let validateCounter = 0;
        for (let i = 0; i < validators.length; i++) {
            if (!validators[i].func(validators[i].parameter)) {
                validator.addError(this._form, validators[i].errors[0], validators[i].errors[1]);
            } else {
                validator.addError(this._form, validators[i].errors[0]);
                validateCounter++;
            }
        }

        if (validateCounter == validators.length) {
            api.SignUp({ login: this._email, password: this._password })
            .then(function (data) {
                // Запрос успешно выполнен
                // redirect to user profile
            })
            .catch(function (error) {
                // Запрос не выполнен
                // redirect to sign up снова с ошибкой
            });
        }
    }
}