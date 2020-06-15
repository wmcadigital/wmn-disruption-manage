import React from 'react';

const UnsubscribedView = () => {
  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>You have succussfully unsubscribed</h3>
        <p>
          If this was a mistake, you can{' '}
          <a
            href={process.env.REACT_APP_DISRUPTION_SIGN_UP_URL}
            title="Sign up to recieve alerts about disruptions"
            target="_self"
            className="wmnds-link"
          >
            sign up
          </a>{' '}
          again.
        </p>
      </div>
    </div>
  );
};

export default UnsubscribedView;
