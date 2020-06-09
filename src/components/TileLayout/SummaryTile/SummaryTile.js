import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);

  return (
    <div className="wmnds-content-tile wmnds-col-1">
      <p>Managing {subscriberState.user.name}&apos;s alerts about disruption</p>
      <p>Alerts sent to {subscriberState.user.email}</p>
    </div>
  );
};

export default SummaryTile;
