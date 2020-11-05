import React, { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import PropTypes from 'prop-types';

// Components
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';
import GenericError from 'components/shared/Errors/GenericError';
import WarningText from 'components/shared/WarningText/WarningText';

// Custom Hooks
import useFetchSendPin from 'customHooks/useFetchSendPin';
import useFetchConfirmPin from 'customHooks/useFetchConfirmPin';

const ConfirmMobilePhone = ({ setWrongPhoneNumber, confirmMobileMode, setEditingMode }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [pin, setPin] = useState('');
  const { errors, confirmPin, isFetching } = useFetchConfirmPin();
  const [validateErrors, setValidateErrors] = useState('');
  const [phoneNumberToVerify, setPhoneNumberToVerify] = useState(null);

  const { sendPinSuccessful } = useFetchSendPin(phoneNumberToVerify, true); // Send the current resend status to our fetch so we can send a new text if the user hits resend

  useEffect(() => {
    if (phoneNumberToVerify) {
      setPhoneNumberToVerify(null); // if the resend has been pressed, we need to map it back to null so the user can click it again
    }
  }, [phoneNumberToVerify]);

  // Reset editing mode to go back to beginning of management prefs
  useEffect(() => {
    if (subscriberState.user.smsMessageSuccess && confirmMobileMode) {
      setEditingMode(false);
    }
  }, [confirmMobileMode, setEditingMode, subscriberState.user.smsMessageSuccess]);

  /* WRONG NUMBER? */
  const enteredWrongNumber = () => {
    setWrongPhoneNumber((x) => !x);
  };

  /* LIVE PIN ERRORS GENERATOR after first SUBMISSION */
  const generateErrors = () => {
    if (pin && (pin.length < 4 || pin.length > 7)) {
      return 'The authentication code should be between 4 to 7 digits long';
    }
    return '';
  };

  /* VALIDATE AND CONFIRM PIN */
  const validateAndConfirmPin = () => {
    if (!generateErrors()) {
      confirmPin(pin);
    } else {
      setValidateErrors(generateErrors());
    }
    setIsSubmitPressed(true);
  };

  return (
    <>
      {((!isSubmitPressed && !errors) ||
        (isSubmitPressed && (errors || errors === null || validateErrors))) && (
        <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
          <h2>Confirm your mobile phone number</h2>

          {errors && (
            <GenericError
              title="Invalid authentication code"
              desc="Please check your authentication code. It should be between 4-7 digits long."
            />
          )}

          <fieldset className="wmnds-fe-fieldset">
            <legend className="wmnds-fe-fieldset__legend">
              <p>
                We’ll send text message disruption alerts to{' '}
                <strong>{subscriberState.user.mobileNumber}</strong>. You need to confirm your
                mobile phone number before you can receive text message alerts.
              </p>
              <p>
                We've sent you a text with your authentication code. If you do not receive the text
                message after 5 minutes, you can resend the authentication code. Your authentication
                code expires at midnight.
              </p>

              {sendPinSuccessful && (
                <WarningText
                  className="wmnds-m-b-md"
                  message="We have resent the authentication code to your mobile phone"
                />
              )}
            </legend>

            <Input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="wmnds-col-1-2 wmnds-col-md-1-4"
              groupClassName="wmnds-m-b-md"
              name="PINCode"
              label="Enter your authentication code"
              type="number"
              isRequired
              errors={isSubmitPressed ? generateErrors() : null}
            />
          </fieldset>

          <div className="wmnds-grid wmnds-grid--align-stretch wmnds-grid--spacing-sm-1-xsm wmnds-grid--spacing-md-2-sm wmnds-grid--spacing-lg-2-sm">
            <div className="wmnds-col-1 wmnds-col-md-1-2">
              <Button
                className="wmnds-btn wmnds-col-1 wmnds-m-t-sm"
                disabled={isFetching}
                isFetching={isFetching}
                text="Confirm code"
                iconRight="general-chevron-right"
                onClick={() => validateAndConfirmPin()}
              />
            </div>
            <div className="wmnds-col-1 wmnds-col-md-1-2">
              <Button
                className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-m-t-sm"
                onClick={() => setPhoneNumberToVerify(subscriberState.user.mobileNumber)}
                text="Resend PIN Code"
              />
            </div>
          </div>

          <div>
            <a
              href="#resetnumber"
              onClick={() => {
                enteredWrongNumber();
                return false;
              }}
              title="Entered the wrong mobile number?"
              target="_self"
              className="wmnds-link wmnds-float-right wmnds-m-t-md"
            >
              Entered the wrong mobile number?
            </a>
          </div>
        </div>
      )}
    </>
  );
};

ConfirmMobilePhone.propTypes = {
  setWrongPhoneNumber: PropTypes.func.isRequired,
  confirmMobileMode: PropTypes.bool,
  setEditingMode: PropTypes.func,
};
ConfirmMobilePhone.defaultProps = {
  confirmMobileMode: false,
  setEditingMode: null,
};

export default ConfirmMobilePhone;
