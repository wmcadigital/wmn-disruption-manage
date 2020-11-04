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
    console.log('entrou dentro desta funcao');
    setConfirmMobileMode(false);
  }

  const handleEditPreferences = () => {
    setEditingMode(true);
    if (smsMessageSuccess) {
      console.log('show success message');
      subscriberDispatch({ type: 'ADD_PIN_CONFIRMATION_MESSAGE', payload: false }); // reset confirmation message
      console.log('not showing success message anymore');
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
          <p>
            We are sending text message disruption alerts to <strong>{mobileNumber}</strong>.
          </p>
          <p>You’re participating in the text message service disruption trial.</p>
          <p>
            <a
              href="https://surveys.hotjar.com/b9f7936e-ae08-44a9-83f6-7bc392754dda"
              title="Please complete a survey."
              target="_blank"
              rel="noopener noreferrer"
              className="wmnds-link"
            >
              Please complete a survey.
            </a>
          </p>
        </>
      )}
      {!emailDisabled && (
        <p>
          We are sending email alerts to <strong>{email}</strong>.
        </p>
      )}
      <Button
        className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-col-md-1-2"
        onClick={() => handleEditPreferences()}
        text="Edit your contact Preferences"
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
