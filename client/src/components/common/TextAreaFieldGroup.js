import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({name, label, placeholder, value, error, info, onChange}) => {
    return (
        <div>
            {info && <small className="info">{info}</small>}
            <textarea
                id={name}
                className={classnames('gate', {'is-invalid': error})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="err">{error}</div>}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
