'use strict'

import { ValidatorModule } from "../../modules/validation.js";

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

        if (validator.validateEmail(this._email)) {
            this._addError("email_error");
            // POST
        } else {
            this._addError("email_error", "Wrong email format");
        }
    }
    
    _addError(errId, msg = '') {
        const errDiv = this._form.children[errId];
        errDiv.innerHTML = msg;
    }
}