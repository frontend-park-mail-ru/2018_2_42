'use strict'
export const FormActions = {
    sign_up: "/sign_up",
    sign_in: "/sign_in"
}

export class FormComponent {
    constructor({ el = document.body, action = '' } = {}) {
        this._el = el;
        this._action = action;
    }

    render() {
        if (this._action === FormActions.sign_in) {
            const data = { 
                headerForm: "Sign In",
                action: this._action,
                method: "POST",
                fields: [
                    { name: 'Email', type: 'email', className: 'input' },
                    { name: 'Password', type: 'password', className: 'input' },
                    { name: 'Sign In', type: 'submit', className: 'form_button' },
                ],
            };
            const template = window.fest['js/components/Form/Form.tmpl'](data);
            this._el.innerHTML += template;
        } else {
            const data = { 
                headerForm: "Sign Up",
                action: this._action,
                method: "POST",
                fields: [
                    { name: 'First Name', type: 'text', className: 'input' },
                    { name: 'Last Name', type: 'text', className: 'input' },
                    { name: 'Email', type: 'email', className: 'input' },
                    { name: 'Password', type: 'password', className: 'input' },
                    { name: 'Repeat Password', type: 'password', className: 'input' },
                    { name: 'Sign Up', type: 'submit', className: 'form_button' },
                ],
            };
            const template = window.fest['js/components/Form/Form.tmpl'](data);
            this._el.innerHTML += template;
        }
    }
}