'use strict';

export const Errors = {
    email: { id: "email_error", wrongFormat: "Wrong email format" },
    password: { id: "password_error", minLength: "Password must be at least 6 characters long", wrongFormat: "Wrong password format" },
    repPassword: { id: "rep_password_error", doNotMatch: "Passwords do not match" },
    firstName: { id: "firstName_error", required: "First name is requried" },
    lastName: { id: "lastName_error", required: "Last name is requried" },
}

export class ValidatorModule {
    validateEmail(email) {
        return /^\w+@\w+\.\w+$/.test(email);
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