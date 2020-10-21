import React, { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import PropTypes from 'prop-types';

// Components
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';
import Message from 'components/shared/Message/Message';
import GenericError from 'components/shared/Errors/GenericError';

// Custom Hooks
import useFetchMobileNumber from 'customHooks/useFetchMobileNumber';
import useFormLogic from 'customHooks/useFormLogic';
import useFetchConfirmMobile from 'customHooks/useFetchConfirmMobile';

const ConfirmMobilePhone = ({ mobilePhoneNumber, setWrongPhoneNumber, setHasMobileActive }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const { register, triggerValidation, submitButton, errors, getValues } = useFormLogic(); // Custom hook for handling submit button (validation, errors etc)
  const [isSubmitPressed, setIsSubmitPressed] = useState(false); // State for tracking if continue has been pressed
  const [isActivationSuccessful, setIsActivationSuccessful] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { activatePhone, addPhone, isFetchSuccessful } = useFetchMobileNumber();

  const [resendPressed, setResendPressed] = useState(false); // Used to track if a user has hit the resend button
  useFetchConfirmMobile(resendPressed); // Send the current resend status to our fetch so we can send a new text if the user hits resend

  // if the resend has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (resendPressed) setResendPressed(false);
  }, [resendPressed]);

  console.log(`active${isActivationSuccessful}`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await triggerValidation();
    setIsSubmitPressed(true);
    // if no errors
    if (result) {
      if (activatePhone(getValues().PINCode)) {
        setIsActivationSuccessful(true);
        console.log(`isActive?${subscriberState.user.mobileActive}`);
        setHasMobileActive(true);
        if (subscriberState.user.mobileActive === true) {
          console.log('Activation done');
          // setIsActivationSuccessful(true);
        } else {
          console.log('Activation failed');
          // setIsActivationSuccessful(false);
        }
      }
    }
    // else, errors are true...
    else {
      console.log('errors');
      // window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    }
    console.log(`active?${isActivationSuccessful}`);
  };

  const showGenericError = Object.keys(errors).length > 0 && isSubmitPressed && (
    <GenericError
      title="Invalid PIN Code"
      desc="Please check your PIN code (4 - 7 digits number)."
    />
  );

  // const resendPINCode = () => {
  //   console.log('resend pin code');
  //   h();
  // };

  const enteredWrongNumber = () => {
    console.log('Reset number');
    setWrongPhoneNumber((x) => !x);
  };

  // Labels used on inputs and for validation
  const PINLabel = 'PIN Code';
  // Logic used to validate the PIN field
  const PINRegex = /^[0-9]{4,7}$/; // only accepts 6 digits number
  const PINValidationRule = register({
    required: 'PIN Code is required',
    pattern: {
      value: PINRegex,
      message: `Enter a valid ${PINLabel}`,
    },
  });

  return (
    <>
      {!isActivationSuccessful && (
        <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
          <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Confirm your mobile phone number</h2>
          <form onSubmit={handleSubmit} autoComplete="on">
            {/* Show generic error message */}
            {showGenericError}
            {/*               {isActivationSuccessful === false && (
                <Message
                  type="error"
                  title="Mobile phone number not confirmed"
                  message={[
                    'Please enter your PIN code again ',
                    <strong>{mobilePhoneNumber}</strong>,
                    '.',
                  ]}
                  className=""
                  hasCloseButton={true}
                />
              )} */}

            <fieldset className="wmnds-fe-fieldset wmnds-col-1 wmnds-col-lg-4-5">
              <legend className="wmnds-fe-fieldset__legend">
                <p>
                  We’ll send text message disruption alerts to <strong>{mobilePhoneNumber}</strong>.
                  You’ll need to confirm your mobile phone number before you can receive text
                  message alerts.
                </p>
                <p>
                  You’ll receive your PIN code within the next 5 minutes. If you do not receive a
                  PIN code after 5 minutes, you can choose to resend the PIN code. Your PIN code
                  will expire at midnight.
                </p>
              </legend>

              <Input
                className="wmnds-col-1 wmnds-col-lg-4-5"
                name="PINCode"
                label={`Enter your ${PINLabel}`}
                type="number"
                fieldValidation={PINValidationRule}
              />
            </fieldset>

            <div className="wmnds-grid wmnds-grid--justify-between">
              {/* submitButton('Confirm your PIN Code') */}

              <Button
                type="submit"
                className="wmnds-btn wmnds-col-1 wmnds-col-md-1-2"
                // disabled={isFetching}
                // isFetching={isFetching}
                text="Confirm your PIN Code"
                onClick={(e) => handleSubmit(e)}
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
          </form>
        </div>
      )}

      {isActivationSuccessful && (
        <Message
          type="success"
          title="Mobile phone number confirmed"
          message={['We’ll send disruption alerts to ', <strong>{mobilePhoneNumber}</strong>, '.']}
          className="wmnds-col-1 wmnds-m-t-lg"
          hasCloseButton
        />
      )}
    </>
  );
};

ConfirmMobilePhone.propTypes = {
  mobilePhoneNumber: PropTypes.string.isRequired,
  setWrongPhoneNumber: PropTypes.func.isRequired,
  setHasMobileActive: PropTypes.func.isRequired,
};

export default ConfirmMobilePhone;
