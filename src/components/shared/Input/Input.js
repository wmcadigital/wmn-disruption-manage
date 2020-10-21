import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const Input = ({
  autocomplete,
  className,
  fieldValidation,
  inputmode,
  label,
  name,
  spellcheck,
  type,
  onChange,
}) => {
  let errors = false;
  // Set input to render below
  const input = (
    <>
      <input
        autoComplete={autocomplete}
        className={`wmnds-fe-input ${errors ? 'wmnds-fe-input--error' : ''}`}
        id={name}
        inputMode={inputmode}
        name={name}
        ref={fieldValidation.pattern.value}
        spellCheck={spellcheck}
        type={type}
        onChange={onChange}
      />
    </>
  );

  return (
    <div className={`wmnds-fe-group ${errors ? 'wmnds-fe-group--error' : ''}`}>
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className="wmnds-fe-label"
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: sanitize(label) }}
        />
      )}

      {/* If there is an error, show here */}
      {errors && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize('error'),
          }}
        />
      )}

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
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  fieldValidation: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
};

export default Input;