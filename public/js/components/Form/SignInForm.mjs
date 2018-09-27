'use strict'

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

        this._form = this._el.getElementsByClassName('form__sign_in')
        this._form.addEventListener('submit', this._submitForm(event));
    }
    
    _submitForm(event) {
        event.preventDefault();
        if (this._validateEmail()) {
            // AJAX.doPost({
            //     callback (xhr) {
            //         root.innerHTML = '';
            //         createProfile();
            //     },
            //     path: '/login',
            //     body: {
            //         email,
            //         password,
            //     },
            // });
        } else {
            this._addError();
        }
    }
    
    _validateEmail() {
        this._email = this._form.elements[ 'email' ].value;
        this._password = this._form.elements[ 'password' ].value;
        // regexp
        return true
    }
    
    _addError(field, msg) {
        const err = this._form.getElementsByClassName('form__error_message');
        err.innerHTML += msg; 
    }
}