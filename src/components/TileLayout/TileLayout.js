import React, { useState, useEffect } from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
import useFetchConfirmServices from 'customHooks/useFetchConfirmServices';
import useFetchMobileNumber from 'customHooks/useFetchMobileNumber';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';
import SignUpSMSTrialTile from 'components/TileLayout/SignUpSMSTrialTile/SignUpSMSTrialTile';
import ConfirmMobilePhoneTile from './ConfirmMobilePhoneTile/ConfirmMobilePhoneTile';
import ResetPhoneTile from './ResetPhoneTile/ResetPhoneTile';
import AddMoreTile from './AddMoreTile/AddMoreTile';
import RemoveTile from './RemoveTile/RemoveTile';
import ManageContactPreferencesTile from './ManageContactPreferencesTile/ManageContactPreferencesTile';
import DeleteTile from './DeleteTile/DeleteTile';
import LoadingView from './LoadingView/LoadingView';
import ErrorView from './ErrorView/ErrorView';
import UnsubscribedView from './UnsubscribedView/UnsubscribedView';
// Helpers
import { getSearchParam } from '../../helpers/URLSearchParams';
let flag = false;

const TileLayout = () => {
  const { confirmServiceIsFinished } = useFetchConfirmServices(); // Run confirm new services before fetching user and return var if it has completed. This ensures that when we fetch the user, we have the most up to date lines they have confirmed.
  const { isFetching, hasError } = useFetchUser(confirmServiceIsFinished); // Then fetch the user
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const [resetMode, setResetMode] = useState(false);

  let mobile;
  const isMobileNumberInURL = getSearchParam('mobi') === null ? false : true;
  if (isMobileNumberInURL) {
    mobile = `+${getSearchParam('mobi').substr(1)}`; // as it is a positive number it automatically ommits the plus signal.
  }
  const { user, addPhone } = useFetchMobileNumber();
  const [hasMobileNumber, setHasMobileNumber] = useState(null);
  const [hasMobileActive, setHasMobileActive] = useState(null);
  const [isDismissTrialActive, setIsDismissTrialActive] = useState(
    localStorage.getItem('dismissTrial') ? true : false
  );

  console.log(user);

  useEffect(() => {
    const isUserInfoLoaded = user.email.length > 0;

    if (isUserInfoLoaded && flag === false) {
      setHasMobileActive(user.mobileActive ? true : false);
      setHasMobileNumber(user.mobileNumber && user.mobileNumber.length > 0 ? true : false);
      console.log('mobile1=' + hasMobileNumber);
      console.log('active1=' + hasMobileActive);
      flag = true;
    }

    if (
      isUserInfoLoaded &&
      isMobileNumberInURL &&
      hasMobileNumber === false &&
      hasMobileActive === false
    ) {
      addPhone(mobile); // Add phone (automatically sends the PIN via text message)
      setHasMobileNumber(true);
    }
    console.log('mobile=' + hasMobileNumber);
    console.log('active=' + hasMobileActive);
  }, [
    addPhone,
    hasMobileActive,
    hasMobileNumber,
    isDismissTrialActive,
    isMobileNumberInURL,
    mobile,
    user.email.length,
    user.mobileActive,
    user.mobileNumber,
  ]);

  return (
    <>
      {(!confirmServiceIsFinished || isFetching) && <LoadingView />}

      {!isFetching && !hasError && !isUnsubscribed && (
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-lg wmnds-p-b-lg wmnds-container">
          <div className="wmnds-col-1 wmnds-col-md-2-3">
            <div className="wmnds-grid">
              {/* To ALL: Title */}
              <div className="wmnds-col-1">
                <h1 className="wmnds-col-1 wmnds-col-lg-4-5">Disruption alerts dashboard</h1>
              </div>
              {/* To ALL: Intro */}
              <SummaryTile />
              {/* User access to his dashboard as usual, url is not the same from the ones who click on the SMS trial email CTA */}
              {!isMobileNumberInURL &&
                !hasMobileNumber &&
                !hasMobileActive &&
                !isDismissTrialActive && (
                  <SignUpSMSTrialTile setIsDismissTrialActive={setIsDismissTrialActive} />
                )}
              {/* User clicked on the SMS trial email CTA */}
              {isMobileNumberInURL && hasMobileNumber && !resetMode && (
                <ConfirmMobilePhoneTile
                  mobilePhoneNumber={mobile}
                  setResetMode={setResetMode}
                  setHasMobileActive={setHasMobileActive}
                />
              )}
              {/* URL from email && Reset Mode */}
              {isMobileNumberInURL && resetMode && (
                <ResetPhoneTile mobilePhoneNumber={mobile} setResetMode={setResetMode} />
              )}
              {/* To ALL: Add services */}
              <AddMoreTile />
              {/* To ALL: Remove services */}
              <RemoveTile />
              {/* Mobile introduced and Active */}
              {hasMobileNumber && hasMobileActive && <ManageContactPreferencesTile />}
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
