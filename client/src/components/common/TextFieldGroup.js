import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({name, placeholder, value, label, error, info, type, onChange, disabled,autocomplete}) => {
    return (
        <div >
            {info && <small className="info">{info}</small>}
            <input
                id={name}
                type={type}
                className={classnames('gate', {'is-invalid': error})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autocomplete}

            />
            <label htmlFor={name}>{label}</label>

            {error && <div className="err">{error}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autoComplete:PropTypes.string,
    disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
