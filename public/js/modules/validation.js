'use strict';

export class ValidatorModule {
    validateEmail(email) {
        return /^\w+@\w+\.\w+$/.test(email);
    }

    validatePassword(password) {
        return length(password) > 6;
    }

    validateFirstName(firstName) {
        return length(firstName) > 0;
    }

    validateLastName(lastName) {
        return length(lastName) > 0;
    }

    validateRepPassword(password1, password2) {
        return password1 === password2;
    }
}