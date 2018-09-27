'use strict'

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
                { name: 'First Name', type: 'text', className: 'form__input' },
                { name: 'Last Name', type: 'text', className: 'form__input' },
                { name: 'Email', type: 'email', className: 'form__input' },
                { name: 'Password', type: 'password', className: 'form__input' },
                { name: 'Repeat Password', type: 'password', className: 'form__input' },
                { name: 'Sign Up', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        this._el.innerHTML += template;
    }
}