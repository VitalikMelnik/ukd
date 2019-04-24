const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRestorePass(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';

    if (!Validator.isEmail(data.email)) {
        errors.all = 'Email is invalid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.all = 'Email field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};