'use strict'

import { Errors, ValidatorModule } from "../../modules/validation.js";

const validator = new ValidatorModule;

export class SignInFormComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            headerForm: "Sign In",
            action: "/sign_in",
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

        this._form = this._el.getElementsByClassName('form__sign_in')[0];
        this._form.addEventListener('submit', function() {
            this._submitForm(event)
        }.bind(this, event));
    }
    
    _submitForm(event) {
        event.preventDefault();

        this._email = this._form["Email"].value;
        this._password = this._form["Password"].value;

        let validated = true;
        if (!validator.validateEmail(this._email)) {
            validator.addError(this._form, Errors.email.id, Errors.email.wrongFormat);
            validated = false;
        } else {
            validator.addError(this._form, Errors.email.id, '');
            validated = true;
        }
        
        if (!validator.validatePassword(this._password)) {
            validator.addError(this._form, Errors.password.id, Errors.password.requried);
            validated = false;
        } else {
            validator.addError(this._form, Errors.password.id, '');
            validated = true;
        }

        if (validated) {
            // POST
            console.log("Validated!");
        }
    }
}