import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { name } = subscriberState.user;

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
      </div>
    </div>
  );
};

export default SummaryTile;
