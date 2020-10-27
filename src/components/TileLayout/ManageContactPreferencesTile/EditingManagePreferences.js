import React, { useState, useContext } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
import Input from 'components/shared/FormElements/Input/Input';
import InputCheckbox from 'components/shared/FormElements/Input/InputCheckbox';
import WarningText from 'components/shared/WarningText/WarningText';
// Custom Hooks
import useFetchDeleteMobileNumber from 'customHooks/useFetchDeleteMobileNumber';
import useFetchToggleEmailAlerts from 'customHooks/useFetchToggleEmailAlerts';
import useFetchChangeMobilePhone from 'customHooks/useFetchChangeMobilePhone';

const EditingManagePreferences = ({
  messages,
  setMessages,
  setEditingMode,
  confirmMobileMode,
  setConfirmMobileMode,
}) => {
  const [subscriberState] = useContext(SubscriberContext);
  const { mobileNumber, email, mobileActive, emailDisabled } = subscriberState.user;
  const [phone, setPhone] = useState(mobileNumber);
  const [preferences, setPreferences] = useState({ phone: mobileActive, email: !emailDisabled });
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);

  const { deletePhoneNumber } = useFetchDeleteMobileNumber();
  const { toggleEmailAlerts } = useFetchToggleEmailAlerts();
  const { changeMobileNumber } = useFetchChangeMobilePhone();

  const isValidMobileNumber = (p) => {
    const number = p.replace(/\s/g, '');
    const mobileRegEx = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    return mobileRegEx.test(number);
  };

  const generateErrors = () => {
    if (!isValidMobileNumber(phone)) {
      return 'Enter a mobile phone number in the correct format';
    }
    return '';
  };

  const handleSubmitChanges = () => {
    setIsSubmitPressed(true);
    // if phone option is selected, only proceed if phone number is valid
    if ((preferences.phone && !generateErrors()) || !preferences.phone) {
      // check if there a change in phone preferences
      if (preferences.phone !== mobileActive) {
        if (preferences.phone) {
          // delete phone
          // add new phone and send pin
          // show confirm pin tile
          // exit edit mode
          // success message
          setMessages([
            ...messages,
            {
              title: 'Mobile phone number confirmed',
              text: ["We'll send disruption alerts to ", <strong>{mobileNumber}</strong>, '.'],
              type: 'success',
            },
          ]);
        } else {
          // Delete Phone
          if (deletePhoneNumber()) {
            console.log('Deleted phone number');
          }
          // success message
          setMessages([
            ...messages,
            {
              title: 'Unsubscribed from text message alerts',
              text: ["We won't send disruption alerts to ", <strong>{mobileNumber}</strong>, '.'],
              type: 'success',
            },
          ]);
        }
      }

      if (preferences.email !== !emailDisabled) {
        console.log(`is Email disabled? ${emailDisabled}`);
        // disable or enable email
        toggleEmailAlerts(preferences.email);

        if (preferences.email) {
          setMessages([
            ...messages,
            {
              title: 'Subscribed to email alerts',
              text: ["We'll send disruption alerts to ", <strong>{email}</strong>, '.'],
              type: 'success',
            },
          ]);
        } else {
          console.log('Unsubscribe email');
          setMessages([
            ...messages,
            {
              title: 'Unsubscribed to email alerts',
              text: ["We won't send disruption alerts to ", <strong>{email}</strong>, '.'],
              type: 'success',
            },
          ]);
        }
      }

      // If user did change phone number and phone option is choosen
      if (preferences.phone && phone !== mobileNumber) {
        console.log('user changed mobile phone number');
        changeMobileNumber(phone);
        setConfirmMobileMode(true);
        setMessages([
          ...messages,
          {
            title: 'Your phone number was changed with success',
            text: ['We will send you a pin code to', <strong>{phone}</strong>, '.'],
            type: 'success',
          },
        ]);
      }

      if (!confirmMobileMode) {
        setEditingMode(false);
        setPreferences({ phone: mobileActive, email: !emailDisabled });
        setPhone(mobileNumber);
      }
    }
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Manage your contact preferences</h2>
      <p>Choose how you would like to receive disruption alerts.</p>

      <div className="wmnds-grid wmnds-grid--spacing-2-md">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <InputCheckbox
            name="preferences"
            labelValue="Mobile Phone"
            checked={preferences.phone}
            onChange={(e) => setPreferences({ email: preferences.email, phone: e.target.checked })}
            classes="wmnds-m-b-md"
          />
        </div>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            groupClassName="wmnds-m-b-md"
            className="wmnds-col-1 wmnds-col-md-1-2"
            name="Phone"
            label="Enter your mobile phone number"
            type="tel"
            isRequired
            hiddenLabel
            errors={isSubmitPressed ? generateErrors() : null}
          />
        </div>
      </div>

      <div className="wmnds-grid wmnds-grid--spacing-2-md">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <InputCheckbox
            name="preferences"
            labelValue="Email"
            checked={preferences.email}
            onChange={(e) => setPreferences({ phone: preferences.phone, email: e.target.checked })}
            classes="wmnds-m-b-md"
          />
        </div>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <p>
            <strong>{email}</strong>
          </p>
        </div>
      </div>

      <hr className="wmnds-m-t-md wmnds-m-b-md" />

      {!preferences.email && !preferences.phone && (
        <WarningText
          className="wmnds-m-b-md"
          type="warning"
          message="You need to select at least one contact method. If you want to unsubscribe from all alerts, please select the ‘Unsubscribe from alerts’ option below."
        />
      )}

      <Button
        className="wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-2"
        disabled={!preferences.email && !preferences.phone}
        onClick={() => handleSubmitChanges()}
        text="Confirm your changes"
        title="Confirm your changes"
        type="submit"
      />

      <Message
        key="Do you want to change your email address?"
        type="info"
        title="Do you want to change your email address?"
        message="If you want to change your current email address, you will have to unsubscribe from all alerts and sign up again with a new email."
        className="wmnds-m-t-lg"
      />
    </div>
  );
};

// Set props
EditingManagePreferences.propTypes = {
  messages: PropTypes.arrayOf(objectOf(PropTypes.string)).isRequired,
  setMessages: PropTypes.func.isRequired,
  setEditingMode: PropTypes.func.isRequired,
  confirmMobileMode: PropTypes.bool.isRequired,
  setConfirmMobileMode: PropTypes.func.isRequired,
};

export default EditingManagePreferences;
