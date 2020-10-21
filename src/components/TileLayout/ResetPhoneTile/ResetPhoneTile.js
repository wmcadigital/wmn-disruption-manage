import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from 'components/shared/Button/Button';
import Input from 'components/shared/FormElements/Input/Input';

const ResetPhoneTile = ({ mobilePhoneNumber, setWrongPhoneNumber }) => {
  const { register } = useForm();

  const handleSendNewPINCode = () => {
    console.log('Reset Phone and send a new pin code');

    // save new phone number

    // send new message

    // set reset mode to false
    setWrongPhoneNumber(false);
  };

  // Labels used on inputs and for validation
  const phoneLabel = 'Mobile phone number';
  // Logic used to validate the phone field
  const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/; // Regex expression only for uk mobile numbers found in this website (2nd reply) - https://community.dynamics.com/crm/f/microsoft-dynamics-crm-forum/119483/javascript-regex-uk-phone-number
  const phoneValidation = register({
    required: `${phoneLabel} is required`,
    pattern: {
      value: phoneRegex,
      message: `Enter an ${phoneLabel.toLowerCase()} in the correct format`,
    },
  });

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      {/* Show generic error message */}
      {/* showGenericError  */}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1 wmnds-col-lg-4-5">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>Reset your mobile phone number</h2>
          <p>
            You requested to receive text message disruption alerts to{' '}
            <strong>{mobilePhoneNumber}</strong>.{' '}
          </p>
          <p>
            If this mobile phone number is incorrect, please enter the correct mobile phone number
            below.
          </p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-4-5"
          name="Phone"
          label={`${phoneLabel}, for example: 07700900090`}
          type="tel"
          fieldValidation={phoneValidation}
        />
      </fieldset>

      <div className="wmnds-grid">
        <Button
          className="wmnds-btn wmnds-col-1 wmnds-col-md-1-2"
          onClick={() => handleSendNewPINCode()}
          text="Send new PIN code"
        />
      </div>
    </div>
  );
};

ResetPhoneTile.propTypes = {
  mobilePhoneNumber: PropTypes.string.isRequired,
  setWrongPhoneNumber: PropTypes.func.isRequired,
};

export default ResetPhoneTile;
