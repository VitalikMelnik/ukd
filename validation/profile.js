const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';


    if(data.edit_profile) {
        if (!Validator.isLength(data.handle, {min: 5, max: 20})) {
            errors.handle = 'Handle length needs to between 10 and 40 characters';
        }
    }
    if(data.edit_profile) {
        if (Validator.isEmpty(data.handle)) {
            errors.handle = 'Profile handle is required';
        }
    }
    if (!Validator.isLength(data.name, {min: 3, max: 40})) {
        errors.name = 'Name length needs to between 3 and 40 characters';
    }
    if (!Validator.matches(data.name, /^[A-z\d]* [A-z\d]*$/)) {
        errors.name = 'Must have space';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Profile name is required';
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }
    if (!isEmpty(data.location)) {
        if (!Validator.isLength(data.location, {min: 3, max: 30})) {
            errors.location = 'Location length needs to between 3 and 30 characters';
        }
    }
    if (!isEmpty(data.credo)) {
        if (!Validator.isLength(data.credo, {min: 3, max: 50})) {
            errors.credo = 'Credo length needs to between 3 and 50 characters';
        }
    }
    if (!isEmpty(data.bio)) {
        if (!Validator.isLength(data.bio, {min: 3, max: 500})) {
            errors.bio = 'Bio length needs to between 3 and 500 characters';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
