import React, { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
// import Input from 'components/shared/FormElements/Input/Input';
// import InputCheckbox from 'components/shared/FormElements/Input/InputCheckbox';

const ManageContactPreferencesTile = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [subscriberState] = useContext(SubscriberContext);
  const { MobileNumber } = subscriberState.user;

  const editContactPreferences = () => {
    // console.log('edit contact preferences mode');
    setEditingMode(true);
  };

  const handleSubmitChanges = () => {
    // console.log('Save new user information');
    // show confirm number tile
  };

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Manage your contact preferences</h2>

      {!editingMode && (
        <>
          <p>We are sending text message disruption alerts to {MobileNumber}.</p>
          <p>You’re participating in the text message service disruption trial.</p>
          <p>
            {/* TODO: update survey link */}
            <a
              href="#survey"
              title="Please complete a survey."
              target="_blank"
              rel="noopener noreferrer"
              className="wmnds-link"
            >
              Please complete a survey.
            </a>
          </p>

          <Button
            className="wmnds-btn wmnds-btn--secondary wmnds-col-auto"
            onClick={() => editContactPreferences()}
            text="Edit your contact Preferences"
          />
        </>
      )}
      {editingMode && (
        <>
          <p>Choose how you would like to receive disruption alerts.</p>

          {/* TODO: add form */}
          {/* checkboxes + inputs 
          <form useRef={formRef}>
            <InputCheckbox fieldValidation="" name="ContactPreferences" labelValue="Mobile Phone" />
            <InputCheckbox fieldValidation="" name="ContactPreferences" labelValue="Email" />
          </form>
          */}

          <Button
            className="wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-2"
            onClick={handleSubmitChanges}
            text="Confirm your changes"
            title="Confirm your changes"
            type="submit"
          />

          <Message
            type="info"
            title="Do you want to change your email address?"
            message="If you want to change your current email address, you will have to unsubscribe from all alerts and sign up again with a new email."
            className="wmnds-m-t-md"
          />
        </>
      )}
    </div>
  );
};

export default ManageContactPreferencesTile;
