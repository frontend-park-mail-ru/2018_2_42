import BaseView from './BaseView.js';
import { Errors, ValidatorModule } from "../modules/validation.js";
import bus from '../bus.js';

const validator = new ValidatorModule;

export default class SignUpView extends BaseView {
	constructor (el) {
		super(el);

		this.login = null;

		bus.on('successful-sign-up', ()=> {
			localStorage.setItem("login", this.login);
			window.router.open({path: "/profile", params: {login: this.login}});
		});

		bus.on('unsuccessful-sign-up', ()=> {
			this.login = null;
			this.showServerError;
		});
	}

	render() {
		super.createNavbar();

			const data = {
				headerForm: "Sign Up",
				action: "/api/v1/user",
				method: "POST",
				classForm: "form__sign_up",
				fields: [
					{ name: 'Login', type: 'text', className: 'form__input', errId: 'login_error' },
					{ name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
					{ name: 'Repeat Password', type: 'password', className: 'form__input', errId: 'rep_password_error' },
					{ name: 'Sign Up', type: 'submit', className: 'form__button' },
				],
			};
			const template = window.fest['js/components/Form/Form.tmpl'](data);
			this.el.innerHTML += template;

			this.form = this.el.querySelector('.form__sign_up');
			this.form.addEventListener('submit', event => {
				this.submitForm(event)
			});
	}

	showServerError(errorMsg) {
			let errorEl= document.createElement("div");
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
			let repPassword = this.form["Repeat Password"].value;

			const validators = [
				{
					func: validator.validateLogin,
					parameter: login,
					errors: [Errors.login.id, Errors.login.required]
				},
				{
					func: validator.validatePassword,
					parameter: password,
					errors: [Errors.password.id, Errors.password.minLength]
				},
				{
					func: validator.validateRepPassword,
					parameter: [password, repPassword],
					errors: [Errors.repPassword.id, Errors.repPassword.doNotMatch]
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
				bus.emit('sign-up-user', { login: login, password: password });
			}
	}
}
