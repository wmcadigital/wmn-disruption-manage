import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ hasError }) => {
  const [timeLeft, setTimeLeft] = useState(60); // set timeleft state

  useEffect(() => {
    let countDown;
    if (hasError !== 'noAccount') {
      // Set an interval to run every one second
      countDown = setInterval(() => {
        setTimeLeft((seconds) => seconds - 1); // Minus 1 second on timeleft
      }, 1000);

      if (timeLeft === 0) window.location.reload(false); // If 0 time left then refresh page
    }
    return () => {
      if (hasError !== 'noAccount') clearInterval(countDown);
    }; // On unmount clear interval
  }, [hasError, timeLeft]);

  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>Sorry, there is a problem with this service</h3>

        {hasError === 'noAccount' ? (
          <>
            <p>This subscription does not seem to be exist.</p>
            <p>Check you are using the correct link to manage alerts about disruptions.</p>
            <p>
              If you have unsubscribed from alerts, you will need to{' '}
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
          </>
        ) : (
          <>
            <p>
              This page will refresh in <strong>{timeLeft}</strong> seconds or you can try again
              later.
            </p>
            <p>Apologies, we are having technical difficulties. Try again later.</p>
          </>
        )}
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  hasError: PropTypes.string.isRequired,
};

export default ErrorPage;
