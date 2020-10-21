import React, { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import PropTypes from 'prop-types';

// Components
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';
import useFetchSendPin from 'customHooks/useFetchSendPin';

const ResetPhoneTile = ({ setWrongPhoneNumber }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const currentMobileNumber = subscriberState.user.mobileNumber;
  const [newMobilePhone, setNewMobilePhone] = useState('');

  /* CHANGE NUMBER and SEND CODE */
  /* useFetchSendPin(false, "") initial state - does nothing */
  /* useFetchSendPin(true, "07700900090") saves the new number and send a new message */
  /* useFetchSendPin(false, "") using useEffect we can set the function back to do nothing - right after sending the message */
  const [submittedMobileNumber, setSubmittedMobileNumber] = useState(''); // Used to track if a user has saved the new phone number
  useFetchSendPin(submittedMobileNumber.length > 0, submittedMobileNumber); // Send the current resend status to our fetch so we can send a new text if the user hits resend
  // if the submit button has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (submittedMobileNumber) setSubmittedMobileNumber('');
  }, [submittedMobileNumber]);

  const handleSendNewPINCode = () => {
    // activates the custom hook in order to save new phone number & send new message
    setSubmittedMobileNumber(newMobilePhone);

    // set reset mode to false
    setWrongPhoneNumber(false);
  };

  const phoneLabel = 'Mobile phone number';
  const isValidMobileNumber = (p) => {
    p = p.replace(/\s/g, '');
    const mobileRegEx = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    return mobileRegEx.test(p);
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      {/* Show generic error message */}
      {/* showGenericError  */}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1 wmnds-col-lg-4-5">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>Reset your mobile phone number</h2>
          <p>
            You requested to receive text message disruption alerts to{' '}
            <strong>{currentMobileNumber}</strong>.{' '}
          </p>
          <p>
            If this mobile phone number is incorrect, please enter the correct mobile phone number
            below.
          </p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-4-5"
          name="Phone"
          value={newMobilePhone}
          onChange={(e) => setNewMobilePhone(e.target.value)}
          label={`${phoneLabel}, for example: 07700900090`}
          type="tel"
          errors={
            newMobilePhone.length > 0 && !isValidMobileNumber(newMobilePhone)
              ? 'Enter an mobile phone number in the correct format'
              : ''
          }
        />
      </fieldset>

      <div className="wmnds-grid">
        <Button
          className="wmnds-btn wmnds-col-1 wmnds-col-md-1-2"
          disabled={!isValidMobileNumber(newMobilePhone) || newMobilePhone.length === 0}
          onClick={() => handleSendNewPINCode()}
          text="Send new PIN code"
        />
      </div>
    </div>
  );
};

ResetPhoneTile.propTypes = {
  setWrongPhoneNumber: PropTypes.func.isRequired,
};

export default ResetPhoneTile;
