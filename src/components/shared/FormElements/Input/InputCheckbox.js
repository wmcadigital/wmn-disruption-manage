/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon/Icon';

const InputCheckbox = ({ fieldValidation, name, labelValue, classes }) => {
  // const { errors } = useForm() || {};
  // Set input to render below

  return (
    /*     <div className={`wmnds-fe-group ${errors[name] ? 'wmnds-fe-group--error' : ''} ${classes}`}>
      {errors[name] && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize(errors[name].message),
          }}
        />
      )} */

    <div className={`wmnds-fe-group ${classes}`}>
      <label className="wmnds-fe-checkboxes__container">
        {labelValue}
        <input
          ref={fieldValidation}
          className="wmnds-fe-checkboxes__input"
          name={name}
          type="checkbox"
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
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
