import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const SelectListGroup = ({name, value, error, info, onChange, options}) => {

    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div>
            {info && <small className="info-select">{info}</small>}
            <select
                className={classnames('select-dropdown', {'is-invalid': error})}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>

            {error && <div className="err">{error}</div>}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectListGroup;
