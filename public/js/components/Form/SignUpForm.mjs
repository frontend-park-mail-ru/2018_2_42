'use strict'

import { Errors, ValidatorModule } from "../../modules/validation.js";

const validator = new ValidatorModule;

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

        // Нам ОЧЕНЬ СТЫДНО за следующие несколько десятков строк кода:(((
        // const validators = [
        //     { func: validator.validateEmail, parameter: this._email },
        // ]
        // console.log(validators[0].func(validators[0].parameter));

        let validated = true
        if (!validator.validateEmail(this._email)) {
            validator.addError(this._form, Errors.email.id, Errors.email.wrongFormat);
            validated = false;
        } else {
            validator.addError(this._form, Errors.email.id);
            validated = true;
        }

        if (!validator.validatePassword(this._password)) {
            validator.addError(this._form, Errors.password.id, Errors.password.minLength);
            validated = false;
        } else {
            validator.addError(this._form, Errors.password.id);
            validated = true;
        }

        if (!validator.validateRepPassword(this._password, this._repPassword)) {
            validator.addError(this._form, Errors.repPassword.id, Errors.repPassword.doNotMatch);
            validated = false;
        } else {
            validator.addError(this._form, Errors.repPassword.id);
            validated = true;
        }

        if (!validator.validateFirstName(this._firstName)) {
            validator.addError(this._form, Errors.firstName.id, Errors.firstName.required);
            validated = false;
        } else {
            validator.addError(this._form, Errors.firstName.id);
            validated = true;
        }

        if (!validator.validateLastName(this._lastName)) {
            validator.addError(this._form, Errors.lastName.id, Errors.lastName.required);
            validated = false;
        } else {
            validator.addError(this._form, Errors.lastName.id);
            validated = true;
        }

        if (validated) {
            // POST
            console.log("Validated!");
        }
    }
}