import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SubscriberContext } from 'globalState/SubscriberContext';
import Button from 'components/shared/Button/Button';

const SignUpSMSTrialTile = ({ setIsDismissTrialActive }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const { name, email } = subscriberState.user;

  let signUpPageUrl;
  if (process.env.NODE_ENV === 'development') {
    signUpPageUrl = 'https://deploy-preview-102--wmn-disruption-sign-up.netlify.app/';
  } else if (process.env.NODE_ENV === 'production') {
    // signUpPageUrl = 'https://disruption-sign-up.wmnetwork.co.uk/'; {/* TODO : UPDATE LINK before go live */}
    signUpPageUrl = 'https://deploy-preview-102--wmn-disruption-sign-up.netlify.app/'; // for testing only
  }

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <div className="wmnds-col-1 wmnds-col-lg-4-5">
        <h2> Sign up to the text message service disruption trial</h2>
        <p>
          We’ll automatically send text message disruption alerts straight to your mobile phone.
        </p>

        <div className="wmnds-grid wmnds-grid--align-stretch wmnds-grid--spacing-sm-1-xsm wmnds-grid--spacing-md-2-sm wmnds-grid--spacing-lg-2-sm wmnds-m-t-md">
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <a
              href={`${signUpPageUrl}?name=${encodeURI(name)}&email=${email}`}
              title="Sign up to text message trial"
              target="_blank"
              rel="noopener noreferrer"
              className="wmnds-btn wmnds-col-1 wmnds-m-b-sm"
            >
              Sign up to text message trial
            </a>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <Button
              className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm"
              onClick={() => {
                setIsDismissTrialActive(true);
                localStorage.setItem('dismissTrial', 'true');
              }}
              text="Dismiss"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SignUpSMSTrialTile.propTypes = {
  setIsDismissTrialActive: PropTypes.func.isRequired,
};

export default SignUpSMSTrialTile;
