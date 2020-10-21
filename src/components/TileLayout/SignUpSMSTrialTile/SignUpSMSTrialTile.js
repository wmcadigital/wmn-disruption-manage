import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SubscriberContext } from 'globalState/SubscriberContext';
import Button from 'components/shared/Button/Button';

const SignUpSMSTrialTile = ({ setIsDismissTrialActive }) => {
  const [subscriberState] = useContext(SubscriberContext);
  const { name, email } = subscriberState.user;

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <div className="wmnds-col-1 wmnds-col-lg-4-5">
        <h2> Sign up to the text message service disruption trial</h2>
        <p>
          We’ll automatically send text message disruption alerts straight to your mobile phone.
        </p>
      </div>
      {/* TODO : Fix group butons with spacing */}
      <div className="wmnds-grid wmnds-grid--align-stretch wmnds-grid--spacing-sm-1-xsm wmnds-grid--spacing-lg-2-lg">
        <a
          href={`https://disruption-sign-up.wmnetwork.co.uk/?name=${name}&email=${email}`}
          title="Sign up to text message trial"
          target="_blank"
          rel="noopener noreferrer"
          className="wmnds-btn wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-sm"
        >
          Sign up to text message trial
        </a>

        <Button
          className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-sm"
          onClick={() => {
            setIsDismissTrialActive(true);
            localStorage.setItem('dismissTrial', 'true');
          }}
          text="Dismiss"
        />
      </div>
    </div>
  );
};

SignUpSMSTrialTile.propTypes = {
  setIsDismissTrialActive: PropTypes.func.isRequired,
};

export default SignUpSMSTrialTile;
