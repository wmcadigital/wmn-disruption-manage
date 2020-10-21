import React, { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import PropTypes from 'prop-types';

// Components
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';
import Message from 'components/shared/Message/Message';
import GenericError from 'components/shared/Errors/GenericError';

// Custom Hooks
import useFetchSendPin from 'customHooks/useFetchSendPin';
import useFetchConfirmPin from 'customHooks/useFetchConfirmPin';

const ConfirmMobilePhone = ({ setWrongPhoneNumber }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const [isActivationSuccessful, setIsActivationSuccessful] = useState(null);
  const [pin, setPin] = useState('');
  const { errors, confirmPin, isFetching } = useFetchConfirmPin();

  /* RESEND CODE */
  const [resendPressed, setResendPressed] = useState(false); // Used to track if a user has hit the resend button
  useFetchSendPin(resendPressed); // Send the current resend status to our fetch so we can send a new text if the user hits resend
  // if the resend has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (resendPressed) setResendPressed(false);
    if (subscriberState.user.mobileActive) setIsActivationSuccessful(true);
    else setIsActivationSuccessful(false);
  }, [resendPressed, subscriberState.user.mobileActive]);

  /* WRONG NUMBER? */
  const enteredWrongNumber = () => {
    setWrongPhoneNumber((x) => !x);
  };

  /* LIVE PIN ERRORS GENERATOR BEFORE SUBMISSION */
  const generateErrors = () => {
    if (pin.length > 0) {
      // do not show errors when input is empty
      if (pin.length < 4) {
        return 'PIN code should have at least 4 digits';
      }
      if (pin.length > 7) {
        return 'PIN code should have a maximum of 7 digits';
      }
    }
    return null;
  };

  return (
    <>
      {!isActivationSuccessful && (
        <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
          <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Confirm your mobile phone number</h2>
          {/* Show generic error message */}
          {errors && (
            <GenericError
              title="Invalid PIN Code"
              desc="Please check your PIN code (4 - 7 digits number)."
            />
          )}

          <fieldset className="wmnds-fe-fieldset wmnds-col-1 wmnds-col-lg-4-5">
            <legend className="wmnds-fe-fieldset__legend">
              <p>
                We’ll send text message disruption alerts to{' '}
                <strong>{subscriberState.user.mobileNumber}</strong>. You’ll need to confirm your
                mobile phone number before you can receive text message alerts.
              </p>
              <p>
                You’ll receive your PIN code within the next 5 minutes. If you do not receive a PIN
                code after 5 minutes, you can choose to resend the PIN code. Your PIN code will
                expire at midnight.
              </p>
            </legend>

            <Input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="wmnds-col-1 wmnds-col-lg-4-5"
              name="PINCode"
              label="Enter your PIN code"
              type="number"
              isRequired
              errors={generateErrors()}
            />
          </fieldset>

          <div className="wmnds-grid wmnds-grid--justify-between">
            <Button
              className="wmnds-btn wmnds-col-1 wmnds-col-md-1-2"
              disabled={!(pin.length >= 4 && pin.length <= 7) || isFetching}
              isFetching={isFetching}
              text="Confirm your PIN Code"
              onClick={() => confirmPin(pin)}
            />
            <Button
              className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-col-md-1-2 "
              onClick={() => setResendPressed(true)}
              text="Resend PIN Code"
            />
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

      {isActivationSuccessful && (
        <Message
          type="success"
          title="Mobile phone number confirmed"
          message={[
            'We’ll send disruption alerts to ',
            <strong>{subscriberState.user.mobileNumber}</strong>,
            '.',
          ]}
          className="wmnds-col-1 wmnds-m-t-lg"
          hasCloseButton
        />
      )}
    </>
  );
};

ConfirmMobilePhone.propTypes = {
  setWrongPhoneNumber: PropTypes.func.isRequired,
};

export default ConfirmMobilePhone;
