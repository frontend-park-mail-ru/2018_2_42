import BaseView from './BaseView.js';
import { Errors, ValidatorModule } from "../modules/validation.js";
import bus from '../bus.js';

const validator = new ValidatorModule;

export default class SignInView extends BaseView {
	constructor(el) {
		super(el);

		bus.on('successful-sign-in', ()=> {
			localStorage.setItem('login', this.login);
			window.router.open({path: "/"});
		});

		bus.on('unsuccessful-sign-in', ()=> {
			this.login = null;
			this.showServerError;
		});
	}

	render() {
		super.createNavbar();
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
		this.el.innerHTML += template;

		this.form = this.el.querySelector('.form__sign_in');
		this.form.addEventListener('submit', event => {
			this.submitForm(event)
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

	submitForm(event) {
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
			this.login = login;
			bus.emit('sign-in-user', { login: login, password: password });
		}
	}
}
