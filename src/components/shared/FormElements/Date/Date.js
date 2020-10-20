import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import DateInput from './DateInput.js/DateInput';

const Date = ({ autoCompletPrefix, fieldValidation, name, label }) => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { errors, triggerValidation } = useFormContext();

  const [stateYear, stateMonth, stateDay] = formDataState.formData[name]
    ? formDataState.formData[name].split('-')
    : ['', '', ''];

  // State used for capturing date fields onChange below (we use these to validate against below)
  const [day, setDay] = useState(stateDay);
  const [month, setMonth] = useState(stateMonth);
  const [year, setYear] = useState(stateYear);
  const [date, setDate] = useState(formDataState.formData[name]);

  const handleChange = (e) => {
    const { value } = e.target;

    // Switch on the input name, depending on name then update the relevant var
    switch (e.target.name) {
      case `${name}Day`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setDay(0 + value); // Then prepend a 0 to it to make it a valid day
        } else {
          setDay(value);
        }
        break;
      case `${name}Month`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setMonth(0 + value); // Then prepend a 0 to it to make it a valid month
        } else {
          setMonth(value);
        }
        break;
      default:
        setYear(value);
    }
  };

  useEffect(() => {
    if (year && month && day) {
      setDate(`${year}-${month}-${day}`);
    } // Set date state to current yyyy-mm-dd set by user (would do it in handleChange event but it falls out of sync)
  }, [day, month, year, setDate]);

  // Trigger validation every time date has been updated
  useEffect(() => {
    if (date) triggerValidation();
  }, [date, triggerValidation]);

  return (
    <>
      {/* If there is an error, show here */}
      {errors[name] && (
        <span className="wmnds-fe-error-message">{errors[name].message}</span>
      )}

      <div
        className={`wmnds-fe-group ${
          errors[name] ? 'wmnds-fe-group--error' : ''
        }`}
      >
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}day` : 'day'}
            dateType="Day"
            defaultValue={day}
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={
              autoCompletPrefix ? `${autoCompletPrefix}month` : 'month'
            }
            dateType="Month"
            defaultValue={month}
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <DateInput
            autoComplete={
              autoCompletPrefix ? `${autoCompletPrefix}year` : 'year'
            }
            dateType="Year"
            defaultValue={year}
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
      </div>
      <input
        name={name}
        type="hidden"
        ref={fieldValidation}
        value={date || ''}
      />
    </>
  );
};

Date.propTypes = {
  autoCompletPrefix: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Date.defaultProps = {
  autoCompletPrefix: '',
  fieldValidation: null,
};

export default Date;
