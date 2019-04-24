const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.info = !isEmpty(data.info) ? data.info : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'Job title field is required';
    }

    if (Validator.isEmpty(data.info)) {
        errors.info = 'Company field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }
    if (!isEmpty(data.description)) {
        if (!Validator.isLength(data.description, {min: 3, max: 500})) {
            errors.description = 'Bio length needs to between 3 and 500 characters';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
