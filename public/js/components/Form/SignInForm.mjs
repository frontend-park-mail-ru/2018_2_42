'use strict'
import { Errors, ValidatorModule } from "../../modules/validation.js";

const validator = new ValidatorModule;

export default class SignInFormComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            headerForm: "Sign In",
            action: "/api/v1/session",
            method: "POST",
            classForm: "form__sign_in",
            fields: [
                { name: 'Login', type: 'text', className: 'form__input', errId: 'login_error' },
                { name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
                { name: 'Sign In', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        this.form = this._el.querySelector('.form__sign_in');
        this.form.addEventListener('submit', (event) => {
            this._submitForm(event)
        });

        document.getElementById(`${data.classForm}_back_btn`).addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("draw-menu");
        });
    }
    
    showServerError(errorMsg) {
        let errorEl = document.createElement("div");
        errorEl.className = "form__errorMessage";
        errorEl.innerText = errorMsg;
        this.form.insertBefore(errorEl, this.form.firstChild);
        setTimeout(() => {
            errorEl.parentNode.removeChild(errorEl);
        }, 3000);
    }

    _submitForm(event) {
        event.preventDefault();

        let login = this.form["Login"].value;
        let password = this.form["Password"].value;

        const validators = [
            { 
                func: validator.validateLogin, 
                parameter: login, 
                errors: [Errors.login.id, Errors.login.wrongFormat]
            },
            { 
                func: validator.validatePassword, 
                parameter: password, 
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
            window.bus.publish("sign-in", { login: login, password: password });
        }
    }
}