import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);

  return (
    <div>
      <div className="wmnds-content-tile">
        <p>Managing {subscriberState.user.name}&apos;s alerts about disruption</p>
        <p>Alerts sent to {subscriberState.user.email}</p>
      </div>

      {/* {this.state.MainPending && this.enum.started ? pending : null}

      {this.state.MainSubscribed && this.enum.newUser === false && this.enum.started
        ? manage
        : null}

      <div className="wmnds-content-tile">
        <h2>Add new alerts</h2>
        <p>Press the button below</p>
        <a href={signRef} className="wmnds-btn  wmnds-col-1 wmnds-col-sm-auto">
          Add alerts
        </a>
      </div>
      <div className="wmnds-content-tile">
        <h2>Unsubscribe from all alerts</h2>
        <p>You will no longer receive alerts and your data will be deleted.</p>
        <button
          onClick={this._handleClickUnsubscribe.bind(this)}
          className="wmnds-btn wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto"
        >
          Unsubscribe from all alerts
        </button>
      </div>

      {nocontent && this.enum.started} */}
    </div>
  );
};

export default SummaryTile;
