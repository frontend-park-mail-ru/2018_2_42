'use strict'

export class FormComponent {
    constructor({ el = document.body, formName = '' } = {}) {
        this._el = el;
        this._formName = formName;
    }

    render() {
        const data = { 
            headerForm: this._formName,
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