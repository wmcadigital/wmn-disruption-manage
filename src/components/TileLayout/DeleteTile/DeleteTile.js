import React, { useState } from 'react';
// Custom hooks
import useFetchDeleteAccount from 'customHooks/useFetchDeleteAccount';
// Components
import Button from 'components/shared/Button/Button';

const DeleteTile = () => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const { deleteAccount, isFetching } = useFetchDeleteAccount();

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Unsubscribe from all alerts</h2>
      <p>You will no longer receive alerts and your data will be deleted.</p>
      {!wantToDelete && (
        <Button
          className="wmnds-btn--primary"
          text="Delete account"
          iconRight="general-trash"
          onClick={() => setWantToDelete(true)}
        />
      )}

      {wantToDelete && (
        <>
          <div className="wmnds-msg-summary wmnds-msg-summary--warning wmnds-m-b-lg">
            <div className="wmnds-msg-summary__header">
              <svg className="wmnds-msg-summary__icon">
                <use
                  xlinkHref="#wmnds-general-warning-circle"
                  href="#wmnds-general-warning-circle"
                />
              </svg>
              <h3 className="wmnds-msg-summary__title">ARE YOU SURE? ....DUDE?</h3>
            </div>

            <div className="wmnds-msg-summary__info">
              <p>You will no longer receive alerts and your data will be deleted.</p>
            </div>
          </div>
          <Button
            className="wmnds-btn--destructive wmnds-m-r-md"
            disabled={isFetching}
            isFetching={isFetching}
            text="Confirm deletion of account"
            iconRight="general-trash"
            onClick={deleteAccount}
          />
          <Button
            className="wmnds-btn--secondary"
            text="No, I didn't mean it"
            onClick={() => setWantToDelete(false)}
          />
        </>
      )}
    </div>
  );
};

export default DeleteTile;
