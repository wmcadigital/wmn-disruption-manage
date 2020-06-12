import React, { useState } from 'react';
import Button from 'components/shared/Button/Button';

const DeleteTile = () => {
  const [wantToDelete, setWantToDelete] = useState(false);

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
            text="Confirm deletion of account"
            iconRight="general-trash"
            onClick={() => setWantToDelete((x) => !x)}
          />
          <Button
            className="wmnds-btn--secondary"
            text="No, I didn't mean it"
            onClick={() => setWantToDelete(false)}
          />
        </>
      )}

      {/* {wantToDelete && (
        <div className="wmnds-msg-summary wmnds-msg-summary--warning wmnds-m-t-lg">
          <div className="wmnds-msg-summary__header">
            <svg className="wmnds-msg-summary__icon">
              <use xlinkHref="#wmnds-general-warning-circle" href="#wmnds-general-warning-circle" />
            </svg>
            <h3 className="wmnds-msg-summary__title">ARE YOU SURE? ....DUDE?</h3>
          </div>

          <div className="wmnds-msg-summary__info">
            Details added what happened and what to do next. Lorem ipsum lorem ipsum. Lorem ipsum
            lorem ipsum.
            <br />
            <br />
            <Button
              className="wmnds-btn--destructive"
              text="Confirm deletion of account"
              iconRight="general-trash"
              onClick={() => setWantToDelete((x) => !x)}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DeleteTile;
