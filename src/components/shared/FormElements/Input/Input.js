import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  autocomplete,
  className,
  fieldValidation,
  inputmode,
  label,
  name,
  spellcheck,
  type,
  value,
  onChange,
  isRequired,
  errors,
  hiddenLabel,
  groupClassName,
}) => {
  // Set input to render below
  const input = (
    <>
      <input
        onChange={onChange}
        value={value}
        autoComplete={autocomplete}
        className={`wmnds-fe-input ${errors ? 'wmnds-fe-input--error' : ''}`}
        id={name}
        inputMode={inputmode}
        name={name}
        ref={fieldValidation}
        spellCheck={spellcheck}
        type={type}
        required={isRequired}
      />
    </>
  );

  return (
    <div className={`wmnds-fe-group ${groupClassName} ${errors ? 'wmnds-fe-group--error' : ''}`}>
      {label && (
        <label className={`wmnds-fe-label ${hiddenLabel ? "wmnds-loader__content" : ""}`} htmlFor={name}>
          {label}
        </label>
      )}

      {/* If there is an error, show here */}
      {errors && <span className="wmnds-fe-error-message">{errors}</span>}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
};

Input.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  fieldValidation: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  errors: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  groupClassName: PropTypes.string,
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  fieldValidation: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
  value: '',
  onChange: null,
  isRequired: false,
  errors: '',
  hiddenLabel: false,
  groupClassName: null,
};

export default Input;
