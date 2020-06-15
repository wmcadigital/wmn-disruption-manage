import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const portalURL = `${window.location.protocol}//${window.location.host}/?user=${subscriberState.query.user}`;

  return (
    <div className="wmnds-content-tile wmnds-col-1">
      <p>
        My portal URL is: <a href={portalURL}>{portalURL}</a>
      </p>
      <p>Managing {subscriberState.user.name}&apos;s alerts about disruption</p>
      <p>Alerts sent to {subscriberState.user.email}</p>
    </div>
  );
};

export default SummaryTile;
