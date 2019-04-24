import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({name, placeholder, label, value, error, icon, type, onChange}) => {
    return (
        <div >
            <input
                id={name}
                className={classnames('gate', {'is-invalid': error})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={name}>{label}</label>
            {error && <div className="err">{error}</div>}
        </div>

    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: 'text'
};

export default InputGroup;
