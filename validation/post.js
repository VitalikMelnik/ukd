const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.header = !isEmpty(data.header) ? data.header : '';
    data.img_href = !isEmpty(data.img_href) ? data.img_href : '';
    data.data = !isEmpty(data.data) ? data.data : '';
    if (!Validator.isLength(data.header, {min: 10, max: 500})) {
        errors.header = 'Text must be between 10 and 500 characters';
    }
    if (Validator.isEmpty(data.header)) {
        errors.header = 'Text field is required';
    }
    if (!isEmpty(data.img_href)) {
        if (!Validator.isURL(data.img_href)) {
            errors.img_href = 'Not a valid URL';
        }
    }
    if (Validator.isEmpty(data.data)) {
        errors.data = 'Data field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
