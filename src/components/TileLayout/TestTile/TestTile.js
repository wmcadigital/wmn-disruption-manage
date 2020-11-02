import React, { useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

import Button from 'components/shared/Button/Button';
import useFetchDeleteMobileNumber from 'customHooks/useFetchDeleteMobileNumber';

const TestTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { name } = subscriberState.user;
  const { deletePhoneNumber, isNumberDeleted } = useFetchDeleteMobileNumber();

  const handleSubmitChanges = () => {
    deletePhoneNumber();
  };

  useEffect(() => {
    if (isNumberDeleted) {
      console.log('Deleteeeeeeed with success');
    }
  }, [isNumberDeleted]);

  return (
    <div className="wmnds-content-tile wmnds-col-1">
      <div className="wmnds-col-1 wmnds-col-lg-4-5">
        <p>
          Hi <strong>{name}</strong>!
        </p>
        <p>You can use this page to manage your service disruption alerts. </p>
        <p>
          Bookmark this page so you can visit it again in future. Do not share the link with anyone
          as it is unique to you.
        </p>
        <Button
          className="wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-2"
          onClick={() => handleSubmitChanges()}
          text="Delete phone"
          title="Delete phone"
        />
      </div>
    </div>
  );
};

export default TestTile;
