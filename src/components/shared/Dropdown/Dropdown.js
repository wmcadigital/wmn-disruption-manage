import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import s from './Dropdown.module.scss';

const Dropdown = ({ name, hint, label, error, options, defaultValue, onChange, onBlur }) => {
  const defaultSelectValue = defaultValue; // cast to acceptable types for a select element

  return (
    <div className={`${s.select} wmnds-fe-group wmnds-m-b-md`}>
      <fieldset className="wmnds-fe-fieldset">
        <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
          <label className="wmnds-fe-label" htmlFor={name}>
            {hint}
          </label>
          <select
            className="wmnds-fe-dropdown__select"
            id={name}
            name={name}
            defaultValue={defaultSelectValue || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            {options.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

// Set props
Dropdown.propTypes = {
  name: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.PropTypes.oneOfType([PropTypes.shape, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

Dropdown.defaultProps = {
  name: '',
  hint: '',
  error: '',
  label: null,
  defaultValue: '',
  onBlur: () => {},
};
export default Dropdown;
