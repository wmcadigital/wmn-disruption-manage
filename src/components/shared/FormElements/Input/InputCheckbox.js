/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

// Import contexts
import { useFormContext } from 'react-hook-form';
import { FormDataContext } from 'globalState/FormDataContext';

import Icon from '../../Icon/Icon';

const { sanitize } = dompurify;

const InputCheckbox = ({ fieldValidation, name, labelValue, classes }) => {
  const [formDataState] = useContext(FormDataContext); // Get the state of form data from FormDataContext
  const { errors } = useFormContext();
  // Set input to render below

  return (
    <div
      className={`wmnds-fe-group ${
        errors[name] ? 'wmnds-fe-group--error' : ''
      } ${classes}`}
    >
      {errors[name] && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize(errors[name].message),
          }}
        />
      )}

      <label className="wmnds-fe-checkboxes__container">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(labelValue),
          }}
        />
        <input
          ref={fieldValidation}
          defaultValue={formDataState.formData[name]}
          className="wmnds-fe-checkboxes__input"
          name={name}
          type="checkbox"
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon
            className="wmnds-fe-checkboxes__icon"
            iconName="general-checkmark"
          />
        </span>
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  labelValue: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

InputCheckbox.defaultProps = {
  labelValue: null,
  fieldValidation: null,
  classes: null,
};

export default InputCheckbox;
