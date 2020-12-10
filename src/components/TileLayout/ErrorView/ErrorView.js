import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ hasError }) => {
  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}

        {hasError === 'noAccount' && (
          <>
            <h3>This subscription does not seem to exist</h3>
            <p>Check you are using the correct link to manage alert preferences.</p>
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
            <p>
              If you&apos;ve lost the link to manage your disruption alerts, <br />
              <a
                href={`${process.env.REACT_APP_DISRUPTION_SIGN_UP_URL}?requestLink=true`}
                title="Request new link to manage your disruption alerts"
                className="wmds-link"
              >
                you can request a new one
              </a>{' '}
            </p>
          </>
        )}

        {hasError === 'true' && (
          <>
            <h3>Sorry, there is a problem with this service</h3>
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
