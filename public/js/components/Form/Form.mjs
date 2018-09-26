'use strict'
export const FormActions = {
    sign_up: "/sign_up",
    sign_in: "/sign_in"
}

export class FormComponent {
    constructor({ el = document.body, headerForm = '', action = '', method = 'get' } = {}) {
        this._el = el;
        this._headerForm = headerForm;
        this._action = action;
        this._method = method;
    }

    render() {
        if (this._action === FormActions.sign_in) {
            const data = { 
                headerForm: this._headerForm,
                action: this._action,
                method: this._method,
                fields: [
                    { name: 'Email', type: 'email', className: 'input' },
                    { name: 'Password', type: 'number', className: 'input' },
                    { name: 'Sign In', type: 'submit', className: 'form_button' },
                ],
            };
            const template = window.fest['js/components/Form/Form.tmpl'](data);
            this._el.innerHTML += template;
        } else {
            const data = { 
                headerForm: this._headerForm,
                action: this._action,
                method: this._method,
                fields: [
                    { name: 'First Name', type: 'text', className: 'input' },
                    { name: 'Last Name', type: 'text', className: 'input' },
                    { name: 'Email', type: 'email', className: 'input' },
                    { name: 'Password', type: 'number', className: 'input' },
                    { name: 'Repeat Password', type: 'password', className: 'input' },
                    { name: 'Sign Up', type: 'submit', className: 'form_button' },
                ],
            };
            const template = window.fest['js/components/Form/Form.tmpl'](data);
            this._el.innerHTML += template;
        }
    }
}