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
import Icon from 'components/shared/Icon/Icon';

const ConfirmMobilePhone = ({ setWrongPhoneNumber }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [pin, setPin] = useState('');
  const { errors, confirmPin, isFetching } = useFetchConfirmPin();

  /* RESEND CODE */
  const [resendPressed, setResendPressed] = useState(false); // Used to track if a user has hit the resend button
  const [resendSuccessful, setResendSuccessful] = useState(false);
  useFetchSendPin(resendPressed); // Send the current resend status to our fetch so we can send a new text if the user hits resend
  // if the resend has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (resendPressed) {
      setResendPressed(false);
      setResendSuccessful(true);
    }
  }, [resendPressed]);

  /* WRONG NUMBER? */
  const enteredWrongNumber = () => {
    setWrongPhoneNumber((x) => !x);
  };

  /* LIVE PIN ERRORS GENERATOR BEFORE SUBMISSION */
  const generateErrors = () => {
    // do not show errors when input is empty
    if (pin.length < 4 || pin.length > 7) {
      return 'The PIN code should be between 4 to 7 digits long';
    }
    return null;
  };

  return (
    <>
      {((!isSubmitPressed && !errors) || (isSubmitPressed && errors)) && (
        <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
          <div className="wmnds-col-1 wmnds-col-lg-4-5">
            <h2>Confirm your mobile phone number</h2>
            
            {errors && (
              <GenericError
                title="Invalid PIN Code"
                desc="Please check your PIN code (4 - 7 digits number)."
              />
            )}

            <fieldset className="wmnds-fe-fieldset">
              <legend className="wmnds-fe-fieldset__legend">
                <p>
                  We’ll send text message disruption alerts to{' '}
                  <strong>{subscriberState.user.mobileNumber}</strong>. You’ll need to confirm your
                  mobile phone number before you can receive text message alerts.
                </p>
                <p>
                  You’ll receive your PIN code within the next 5 minutes. If you do not receive a
                  PIN code after 5 minutes, you can choose to resend the PIN code. Your PIN code
                  will expire at midnight.
                </p>

                {resendSuccessful && (
                  <p className="wmnds-msg-summary--success">
                    <Icon iconName="general-success" className="wmnds-msg-summary__icon" />
                    <strong>We have resent the PIN code to your mobile phone</strong>
                  </p>
                )}
                
              </legend>

              <Input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="wmnds-col-1 wmnds-col-md-1-2"
                name="PINCode"
                label="Enter your PIN code"
                type="number"
                isRequired
                errors={isSubmitPressed ? generateErrors() : null}
              />
            </fieldset>

            <div className="wmnds-grid wmnds-grid--align-stretch wmnds-grid--spacing-sm-1-xsm wmnds-grid--spacing-md-2-sm wmnds-grid--spacing-lg-2-sm">
              <div className="wmnds-col-1 wmnds-col-md-1-2">
                <Button
                  className="wmnds-btn wmnds-col-1"
                  disabled={!(pin.length >= 4 && pin.length <= 7) || isFetching}
                  isFetching={isFetching}
                  text="Confirm your PIN Code"
                  iconRight="general-chevron-right"
                  onClick={() => {
                    confirmPin(pin);
                    setIsSubmitPressed(true);
                  }}
                />
              </div>
              <div className="wmnds-col-1 wmnds-col-md-1-2">
                <Button
                  className="wmnds-btn wmnds-btn--secondary wmnds-col-1"
                  onClick={() => setResendPressed(true)}
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
        </div>
      )}

      {isSubmitPressed && !errors && (
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
