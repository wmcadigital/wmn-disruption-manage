import React from 'react';
import PropTypes from 'prop-types';
// Import styling
import s from './Checkbox.module.scss';

const Checkbox = ({ name, fieldValidation, text, value, checked, onChange }) => {
  return (
    <>
      <div>
        <input
          className={`${s.checkbox}`}
          name={name}
          type="checkbox"
          ref={fieldValidation}
          value={value}
          checked={checked}
          onChange={onChange}
          id={text}
        />
        <label
          htmlFor={text}
          className={`wmnds-btn wmnds-btn--secondary wmnds-btn--block ${s.button} `}
        >
          {text}
        </label>
      </div>
    </>
  );
};

// PropTypes
Checkbox.propTypes = {
  name: PropTypes.string,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

Checkbox.defaultProps = {
  name: '',
  fieldValidation: null,
};

export default Checkbox;
