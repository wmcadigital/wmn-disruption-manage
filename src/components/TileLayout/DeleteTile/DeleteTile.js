import React from 'react';
import Button from 'components/shared/Button/Button';

const DeleteTile = () => {
  return (
    <div className="wmnds-m-t-lg wmnds-col-1">
      <div className="wmnds-content-tile">
        <h2>Delete your account</h2>
        <p>You will no longer receive alerts and your data will be deleted.</p>
        <Button
          className="wmnds-btn--destructive"
          text="Delete account"
          iconRight="general-trash"
        />
      </div>
    </div>
  );
};

export default DeleteTile;
