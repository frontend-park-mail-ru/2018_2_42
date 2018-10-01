'use strict';

export const Errors = {
    login: { id: "login_error", required: "Login is required" },
    password: { id: "password_error", minLength: "Password must be at least 6 characters long", wrongFormat: "Wrong password format" },
    repPassword: { id: "rep_password_error", doNotMatch: "Passwords do not match" },
    firstName: { id: "firstName_error", required: "First name is requried" },
    lastName: { id: "lastName_error", required: "Last name is requried" },
}

export class ValidatorModule {
    validateLogin(login) {
        // покрывает 99 % адресов
        // return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
        return login.length > 0;
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateFirstName(firstName) {
        return firstName.length > 0;
    }

    validateLastName(lastName) {
        return lastName.length > 0;
    }

    validateRepPassword(passwords = []) {
        return passwords[0] === passwords[1];
    }

    addError(form, errId, msg = '') {
        const errDiv = form.children[errId];
        errDiv.innerHTML = msg;
    }
}