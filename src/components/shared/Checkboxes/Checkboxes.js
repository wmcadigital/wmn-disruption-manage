import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Context
import { SubscriberContext } from 'globalState/SubscriberContext';
import useFilterQuietTimes from 'customHooks/useFilterQuietTimes';

// Import components
import Checkbox from './Checkbox/Checkbox';

const Checkboxes = ({ name, label, checkboxes, fieldValidation, parentCallback }) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const subscribedQuietTimes = useFilterQuietTimes();
  const QuietDays = subscriberState.user.QuietDays || subscribedQuietTimes.subscribedQuietDays;
  const selectedDays = QuietDays ? checkboxes.map((a) => QuietDays.includes(a.value)) : [];
  const [checkedState, setCheckedState] = useState(selectedDays);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const daysSelected = updatedCheckedState.map((currentState, index) => {
      if (currentState === true) {
        return checkboxes[index].value;
      }
      return null;
    });
    const filtered = daysSelected.filter((a) => a);
    parentCallback(filtered);
  };
  return (
    <div>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          {label && <h2 className="wmnds-fe-question">{label}</h2>}
          {/* If there is an error, show here */}
        </legend>
        <div className="wmnds-fe-checkboxes">
          {/* Loop through checkboxes and display each checkbox */}
          {checkboxes.map(({ text, value }, index) => (
            <Checkbox
              key={text}
              name={name}
              text={text}
              value={value}
              fieldValidation={fieldValidation}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

// PropTypes
Checkboxes.propTypes = {
  fieldValidation: PropTypes.func,
  name: PropTypes.string,
  parentCallback: PropTypes.func.isRequired,
  label: PropTypes.string,
  checkboxes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string, PropTypes.string)).isRequired,
};

Checkboxes.defaultProps = {
  fieldValidation: null,
  label: null,
  name: '',
};

export default Checkboxes;
