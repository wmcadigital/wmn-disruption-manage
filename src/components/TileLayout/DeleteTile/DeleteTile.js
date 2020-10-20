import React, { useState } from 'react'; // Custom hooks
import PropTypes from 'prop-types';
import useFetchDeleteAccount from 'customHooks/useFetchDeleteAccount';
// Components
import Message from 'components/shared/Message/Message';
import Button from 'components/shared/Button/Button';

const DeleteTile = ({ setIsUnsubscribed }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const { deleteAccount, isFetching } = useFetchDeleteAccount(setIsUnsubscribed);

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Unsubscribe from all alerts</h2>
      {!wantToDelete && (
        <>
          <p>You’ll no longer receive alerts and we’ll delete all your information.</p>
          <Button
            className="wmnds-btn--destructive"
            text="Unsubscribe from alerts"
            iconRight="general-trash"
            onClick={() => setWantToDelete(true)}
          />
        </>
      )}

      {wantToDelete && (
        <>
          <Message
            className="wmnds-m-b-lg"
            type="warning"
            title="Are you sure you want to unsubscribe from alerts?"
            message="Your information will be erased and you will have to sign up again."
          />
          <Button
            className="wmnds-btn--destructive wmnds-m-r-md"
            disabled={isFetching}
            isFetching={isFetching}
            text="Unsubscribe"
            iconRight="general-trash"
            onClick={deleteAccount}
          />
          <Button
            className="wmnds-btn--secondary"
            text="Cancel"
            onClick={() => setWantToDelete(false)}
          />
        </>
      )}
    </div>
  );
};

DeleteTile.propTypes = {
  setIsUnsubscribed: PropTypes.func.isRequired,
};

export default DeleteTile;
