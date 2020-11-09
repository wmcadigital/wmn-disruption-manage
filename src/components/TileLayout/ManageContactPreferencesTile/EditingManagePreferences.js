import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import useFetchSendPin from 'customHooks/useFetchSendPin';
import {
  isValidMobileNumber,
  includeCountryCode,
  omitCountryCode,
  formatAndOmitCountryCode,
} from 'helpers/MobilePhoneConversors';

const EditingManagePreferences = ({ setMessages, setEditingMode, setConfirmMobileMode }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const { mobileNumber, email, mobileActive, emailDisabled } = subscriberState.user;
  const [phone, setPhone] = useState(omitCountryCode(mobileNumber));
  const [preferences, setPreferences] = useState({ phone: mobileActive, email: !emailDisabled });
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  const [doesPhonePrefChanged, setDoesPhonePrefChanged] = useState(false);
  const [doesEmailPrefChanged, setDoesEmailPrefChanged] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [doesPhoneNumberChanged, setDoesPhoneNumberChanged] = useState(false);
  const [readyToShowMessages, setReadyToShowMessages] = useState(false);

  const { isNumberDeleted, deletePhoneNumber } = useFetchDeleteMobileNumber();
  const { isToggleDone, toggleEmailAlerts } = useFetchToggleEmailAlerts();

  const { sendPinSuccessful } = useFetchSendPin(newPhone, true);

  useEffect(() => {
    const newMessages = [];
    if (doesPhoneNumberChanged && newPhone && sendPinSuccessful) {
      setNewPhone('');
      setConfirmMobileMode(true);
    }

    if (doesEmailPrefChanged) {
      setReadyToShowMessages(false);
      if (isEmailEnabled && isToggleDone) {
        newMessages.push({
          key: `email_${new Date().getTime()}`,
          title: 'Subscribed from email alerts',
          text: ["We'll send disruption alerts to ", <strong>{email}</strong>, '.'],
          type: 'success',
        });
        setPreferences({ phone: mobileActive, email: !emailDisabled });
        setReadyToShowMessages(true);
      } else if (!isEmailEnabled && isToggleDone) {
        newMessages.push({
          key: `email_${new Date().getTime()}`,
          title: 'Unsubscribed from email alerts',
          text: ["We'll no longer send disruption alerts to ", <strong>{email}</strong>, '.'],
          type: 'success',
        });
        setPreferences({ phone: mobileActive, email: !emailDisabled });
        setReadyToShowMessages(true);
      }
      setMessages([...newMessages]);
    }

    if (doesPhonePrefChanged) {
      setReadyToShowMessages(false);
      if (isNumberDeleted) {
        newMessages.push({
          key: `phone_${new Date().getTime()}`,
          title: 'Unsubscribed from text message alerts',
          text: ["We'll no longer send disruption alerts to ", <strong>{phone}</strong>, '.'],
          type: 'success',
        });
        setMessages([...newMessages]);
        setReadyToShowMessages(true);
      }
    }

    if (readyToShowMessages) {
      setEditingMode(false);
      setReadyToShowMessages(false);
    }
  }, [
    doesEmailPrefChanged,
    doesPhoneNumberChanged,
    doesPhonePrefChanged,
    email,
    emailDisabled,
    isEmailEnabled,
    isNumberDeleted,
    isToggleDone,
    mobileActive,
    mobileNumber,
    newPhone,
    phone,
    readyToShowMessages,
    sendPinSuccessful,
    setConfirmMobileMode,
    setEditingMode,
    setMessages,
  ]);

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
      // Check if there a change in phone preferences
      if (preferences.phone !== mobileActive) {
        if (!preferences.phone) {
          setDoesPhonePrefChanged(true);
          deletePhoneNumber();
        }
      }
      // If user did change his email preferences
      if (preferences.email !== !emailDisabled) {
        setDoesEmailPrefChanged(true);
        setIsEmailEnabled(preferences.email);
        toggleEmailAlerts(preferences.email);
      }
      // If user did change phone number and phone option is chosen
      if (preferences.phone && phone !== omitCountryCode(mobileNumber)) {
        setDoesPhoneNumberChanged(true);
        deletePhoneNumber(false);
        setNewPhone(includeCountryCode(phone));
      }

      // it there is no change at all, go back to Intro
      if (
        preferences.phone === mobileActive &&
        phone === omitCountryCode(mobileNumber) &&
        preferences.email === !emailDisabled
      ) {
        setEditingMode(false);
      }
    }
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Manage your contact preferences</h2>
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
      />

      <Message
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
  setMessages: PropTypes.func.isRequired,
  setEditingMode: PropTypes.func.isRequired,
  setConfirmMobileMode: PropTypes.func.isRequired,
};

export default EditingManagePreferences;
