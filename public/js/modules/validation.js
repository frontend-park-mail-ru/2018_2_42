'use strict';

export const Errors = {
    login: { id: "login_error", required: "Login is required" },
    password: { id: "password_error", minLength: "Password must be at least 6 characters long", wrongFormat: "Wrong password format" },
    repPassword: { id: "rep_password_error", doNotMatch: "Passwords do not match" },
    firstName: { id: "firstName_error", required: "First name is requried" },
    lastName: { id: "lastName_error", required: "Last name is requried" },
}

export class ValidatorModule {
    /**
     * Checks that login is not empty
     * @param {string} login login to be validated
     * @returns {boolean}
     */
    validateLogin(login) {
        // покрывает 99 % адресов
        // return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
        return login.length > 0;
    }

    /**
     * Checks that password length is more than 6 symbols
     * @param {string} password password to be validated
     * @returns {boolean}
     */
    validatePassword(password) {
        return password.length >= 6;
    }

    /**
     * Checks that firstName is not empty
     * @param {string} firstName firstName to be validated
     * @returns {boolean}
     */
    validateFirstName(firstName) {
        return firstName.length > 0;
    }

    /**
     * Checks that lastName is not empty
     * @param {string} lastName lastName to be validated
     * @returns {boolean}
     */
    validateLastName(lastName) {
        return lastName.length > 0;
    }

    /**
     * Checks if passwords match
     * @param {Array} passwords array of two passwords
     * @returns {boolean}
     */
    validateRepPassword(passwords = []) {
        return passwords[0] === passwords[1];
    }

    /**
     * Displays error messages for the given form
     * @param {form} form form element where errors should appear
     * @param {string} errId id of error field
     * @param {string} msg error message to be displayed
     */
    addError(form, errId, msg = '') {
        const errDiv = form.children[errId];
        errDiv.innerHTML = msg;
    }
}