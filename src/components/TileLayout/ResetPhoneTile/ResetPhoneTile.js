import React, { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import PropTypes from 'prop-types';
// Custom Hooks
import useFetchSendPin from 'customHooks/useFetchSendPin';
import useFetchDeleteMobileNumber from 'customHooks/useFetchDeleteMobileNumber';
import {
  isValidMobileNumber,
  includeCountryCode,
  omitCountryCode,
} from 'helpers/MobilePhoneConversors';
// Components
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';
import GenericError from 'components/shared/Errors/GenericError';

const ResetPhoneTile = ({ setWrongPhoneNumber }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const currentMobileNumber = subscriberState.user.mobileNumber;
  const [newMobilePhone, setNewMobilePhone] = useState('');
  const { deletePhoneNumber, isDeleting } = useFetchDeleteMobileNumber();
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [resetWithErrors, setResetWithErrors] = useState(false);

  /* CHANGE NUMBER and SEND CODE */
  /* useFetchSendPin("", true) initial state - does nothing */
  /* useFetchSendPin("07700900090", true) saves the new number and send a new message */
  /* useFetchSendPin("", true) using useEffect we can set the function back to do nothing - right after sending the message */
  const [submittedMobileNumber, setSubmittedMobileNumber] = useState(''); // Used to track if a user has saved the new phone number
  const { sendPinIsFinished, sendPinSuccessful } = useFetchSendPin(submittedMobileNumber, true); // Send the current resend status to our fetch so we can send a new text if the user hits resend
  // if the submit button has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (submittedMobileNumber) {
      setSubmittedMobileNumber(null);
    }
  }, [submittedMobileNumber]);

  useEffect(() => {
    if (sendPinIsFinished && sendPinSuccessful) {
      setWrongPhoneNumber(false); // set reset mode to false
    } else if (sendPinIsFinished && sendPinSuccessful === false) {
      setResetWithErrors(true); // activate mode to show errors
    }
  }, [sendPinIsFinished, sendPinSuccessful, setWrongPhoneNumber]);

  /* LIVE PIN ERRORS GENERATOR BEFORE SUBMISSION */
  const generateErrors = () => {
    if (!isValidMobileNumber(newMobilePhone)) {
      return 'Enter a mobile phone number in the correct format';
    }
    return '';
  };

  const handleSendNewPINCode = () => {
    setIsSubmitPressed(true);
    if (!generateErrors()) {
      // delete Phone
      deletePhoneNumber(false);
      // activates the custom hook in order to save new phone number & send new message
      setSubmittedMobileNumber(includeCountryCode(newMobilePhone));
    }
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>Reset your mobile phone number</h2>
          {/* Show generic error message */}
          {resetWithErrors && (
            <GenericError
              title="An error occurred"
              desc="Unable to finish your request. Please try again."
            />
          )}
          <p>
            You requested to receive text message disruption alerts to{' '}
            <strong>{omitCountryCode(currentMobileNumber)}</strong>.{' '}
          </p>
          <p>
            If this mobile phone number is incorrect, please enter the correct mobile phone number
            below.
          </p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-3-4"
          name="Phone"
          value={newMobilePhone}
          onChange={(e) => setNewMobilePhone(e.target.value)}
          label="Mobile phone number, for example: 07700900090"
          type="tel"
          errors={isSubmitPressed ? generateErrors() : null}
          required
        />
      </fieldset>

      <div className="wmnds-grid wmnds-grid--align-stretch wmnds-grid--spacing-sm-1-xsm wmnds-grid--spacing-md-2-sm wmnds-grid--spacing-lg-2-sm wmnds-m-t-md">
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            className="wmnds-btn wmnds-col-1"
            disabled={isDeleting || !sendPinIsFinished}
            onClick={() => handleSendNewPINCode()}
            text="Send new PIN code"
            iconRight="general-chevron-right"
          />
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            className="wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm"
            onClick={() => setWrongPhoneNumber(false)}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

ResetPhoneTile.propTypes = {
  setWrongPhoneNumber: PropTypes.func.isRequired,
};

export default ResetPhoneTile;
