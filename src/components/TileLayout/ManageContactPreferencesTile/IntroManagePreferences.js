import React, { useContext } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { SubscriberContext } from 'globalState/SubscriberContext';

// Components
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';

const IntroManagePreferences = ({
  messages,
  setMessages,
  setEditingMode,
  // setIsEditingManagerPreferences,
  confirmMobileMode,
  setConfirmMobileMode,
}) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext);
  const {
    mobileNumber,
    email,
    mobileActive,
    emailDisabled,
    smsMessageSuccess,
  } = subscriberState.user;

  if (smsMessageSuccess && confirmMobileMode) {
    setMessages([
      ...messages,
      {
        key: `change-phone_${new Date().getTime()}`,
        title: 'Mobile phone number confirmed',
        text: ["We'll send disruption alerts to ", <strong>{mobileNumber}</strong>, '.'],
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
            You&apos;re participating in the text message alert trial. We are sending texts to{' '}
            <strong>{mobileNumber}</strong>.
          </p>
          <p>
            <a
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=RetZCK7xCk6e-ubWa7tnLz45Weo_RTVDpYxVYcrD8wxUOE1INTBMOEdXMFJSQTI4MUpRWlJQMEZWTi4u"
              title="Survey about the text message alert trial"
              target="_blank"
              rel="noopener noreferrer"
              className="wmnds-link"
            >
              You can give feedback about the text messages.
            </a>
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
  // setIsEditingManagerPreferences: PropTypes.func.isRequired,
  confirmMobileMode: PropTypes.bool.isRequired,
  setConfirmMobileMode: PropTypes.func.isRequired,
};

export default IntroManagePreferences;
