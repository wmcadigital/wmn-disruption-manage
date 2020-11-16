import React, { useState, useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
import useFetchConfirmServices from 'customHooks/useFetchConfirmServices';
import useFetchSendPin from 'customHooks/useFetchSendPin';
import useFetchAddTrains from 'customHooks/useFetchAddTrains';
// Helpers
import { formatAndOmitCountryCode } from 'helpers/MobilePhoneConversors';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';
import SignUpSMSTrialTile from 'components/TileLayout/SignUpSMSTrialTile/SignUpSMSTrialTile';
import Message from 'components/shared/Message/Message';
import ConfirmMobilePhone from './ConfirmMobilePhoneTile/ConfirmMobilePhone';
import ResetPhoneTile from './ResetPhoneTile/ResetPhoneTile';
import AddMoreTile from './AddMoreTile/AddMoreTile';
import RemoveTile from './RemoveTile/RemoveTile';
import ManageContactPreferencesTile from './ManageContactPreferencesTile/ManagePreferencesTile';
import DeleteTile from './DeleteTile/DeleteTile';
import LoadingView from './LoadingView/LoadingView';
import ErrorView from './ErrorView/ErrorView';
import UnsubscribedView from './UnsubscribedView/UnsubscribedView';

const TileLayout = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { confirmServiceIsFinished } = useFetchConfirmServices(); // Run confirm new services before fetching user and return var if it has completed. This ensures that when we fetch the user, we have the most up to date lines they have confirmed.
  const { addTrainsIsFinished } = useFetchAddTrains(); // Add trains if they exist on the URL
  const { sendPinIsFinished } = useFetchSendPin(subscriberState.query.mobileNumber);
  const { isFetching, hasError } = useFetchUser(
    confirmServiceIsFinished && addTrainsIsFinished,
    sendPinIsFinished
  );

  const { mobileNumber, mobileActive, smsMessageSuccess } = subscriberState.user;
  const [wrongPhoneNumber, setWrongPhoneNumber] = useState(false);
  const [isDismissTrialActive, setIsDismissTrialActive] = useState(
    !!localStorage.getItem('dismissTrial')
  );
  const [isEditingManagePreferences, setIsEditingManagerPreferences] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  return (
    <>
      {(!confirmServiceIsFinished || isFetching) && <LoadingView />}

      {!isFetching && !hasError && !isUnsubscribed && (
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-xl wmnds-p-b-lg wmnds-container">
          <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-2-3">
            <div className="wmnds-grid">
              {/* To ALL: Intro */}
              <SummaryTile />

              {/* To users that has not mobilePhone in the system or in the url - User has access to his dashboard as usual */}
              {/* It won't show to users that pressed "dismiss" previously */}
              {!isDismissTrialActive && !mobileNumber && (
                <SignUpSMSTrialTile setIsDismissTrialActive={setIsDismissTrialActive} />
              )}

              {/* To Users that clicked to confirm the text message trial email's CTA */}
              {mobileNumber &&
                !mobileActive &&
                !wrongPhoneNumber &&
                !isEditingManagePreferences && (
                  <ConfirmMobilePhone setWrongPhoneNumber={setWrongPhoneNumber} />
                )}

              {/* To users that wants to reset Phone number and clicked on "Wrong phone number" link on confirm Pin tile  */}
              {wrongPhoneNumber && !isEditingManagePreferences && (
                <ResetPhoneTile setWrongPhoneNumber={setWrongPhoneNumber} />
              )}

              {/* To Users that have completed the phone activation by submitting the correct pin number */}
              {smsMessageSuccess && !isEditingManagePreferences && (
                <Message
                  type="success"
                  title="Mobile phone number confirmed"
                  message={[
                    'We’ll send disruption alerts to ',
                    <strong>{formatAndOmitCountryCode(mobileNumber)}</strong>,
                    '.',
                  ]}
                  className="wmnds-col-1 wmnds-m-t-lg bg-white"
                  hasCloseButton
                />
              )}

              {/* To ALL: Add services */}
              <AddMoreTile />

              {/* To ALL: Remove services */}
              <RemoveTile />

              {/* Only for users that are in the trial (= whoever has mobile number active) */}
              {((mobileNumber && mobileActive) || isEditingManagePreferences) && (
                <ManageContactPreferencesTile
                  setIsEditingManagerPreferences={setIsEditingManagerPreferences}
                  setWrongPhoneNumber={setWrongPhoneNumber}
                  wrongPhoneNumber={wrongPhoneNumber}
                />
              )}

              {/* To ALL: Delete Subscription */}
              <DeleteTile setIsUnsubscribed={setIsUnsubscribed} />
            </div>
          </div>
        </div>
      )}

      {isUnsubscribed && <UnsubscribedView />}

      {!isFetching && confirmServiceIsFinished && hasError && <ErrorView hasError={hasError} />}
    </>
  );
};

export default TileLayout;
