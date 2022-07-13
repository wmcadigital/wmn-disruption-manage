import React, { useContext } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
// Helpers
import { formatAndOmitCountryCode } from 'helpers/MobilePhoneConversors';

const IntroManagePreferences = ({
  messages,
  setMessages,
  setEditingMode,
  confirmMobileMode,
  setConfirmMobileMode,
}) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext);
  const { mobileNumber, email, mobileActive, emailDisabled, smsMessageSuccess } =
    subscriberState.user;

  if (smsMessageSuccess && confirmMobileMode) {
    setMessages([
      ...messages,
      {
        key: `change-phone_${new Date().getTime()}`,
        title: 'Mobile phone number confirmed',
        text: [
          "We'll send disruption alerts to ",
          <strong>{formatAndOmitCountryCode(mobileNumber)}</strong>,
          '.',
        ],
        type: 'success',
      },
    ]);
    setConfirmMobileMode(false);
  }

  const handleEditPreferences = () => {
    setEditingMode(true);
    if (smsMessageSuccess) {
      subscriberDispatch({ type: 'ADD_PIN_CONFIRMATION_MESSAGE', payload: false }); // reset confirmation message
    }
    setMessages([]); // reset messages
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Manage your contact preferences</h2>

      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <Message
              key={message.key}
              type={message.type}
              title={message.title}
              message={message.text}
              className="wmnds-col-1 wmnds-m-b-md"
              hasCloseButton
            />
          );
        })}

      {mobileActive && (
        <>
          <h3>Text messages</h3>
          <p>
            We are sending texts to <strong>{formatAndOmitCountryCode(mobileNumber)}</strong>.
          </p>
        </>
      )}

      {!emailDisabled && (
        <>
          <h3>Emails</h3>
          <p>
            We are sending emails to <strong>{email}</strong>.
          </p>
        </>
      )}

      <Button
        className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-col-md-1-2"
        onClick={() => handleEditPreferences()}
        text="Edit your contact preferences"
      />
    </div>
  );
};

// Set props
IntroManagePreferences.propTypes = {
  messages: PropTypes.arrayOf(objectOf(PropTypes.string)).isRequired,
  setMessages: PropTypes.func.isRequired,
  setEditingMode: PropTypes.func.isRequired,
  confirmMobileMode: PropTypes.bool.isRequired,
  setConfirmMobileMode: PropTypes.func.isRequired,
};

export default IntroManagePreferences;
