import React, { useState, useEffect } from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
import useFetchConfirmServices from 'customHooks/useFetchConfirmServices';
import useFetchConfirmMobile from 'customHooks/useFetchConfirmMobile';
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
// import { getSearchParam } from '../../helpers/URLSearchParams';

// let flag = false;

const TileLayout = () => {
  const { confirmServiceIsFinished } = useFetchConfirmServices(); // Run confirm new services before fetching user and return var if it has completed. This ensures that when we fetch the user, we have the most up to date lines they have confirmed.

  const { confirmMobileIsFinished } = useFetchConfirmMobile();
  const { isFetching, hasError } = useFetchUser(confirmServiceIsFinished, confirmMobileIsFinished); // Then fetch the user

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const [wrongPhoneNumber, setWrongPhoneNumber] = useState(false);

  // const [isDismissTrialActive, setIsDismissTrialActive] = useState(
  //   localStorage.getItem('dismissTrial') ? true : false
  // );

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
              {<SignUpSMSTrialTile />}
              {/* User clicked on the SMS trial email CTA */}
              {<ConfirmMobilePhoneTile setWrongPhoneNumber={setWrongPhoneNumber} />}
              {/* URL from email && Reset Mode */}
              {wrongPhoneNumber && <ResetPhoneTile setWrongPhoneNumber={setWrongPhoneNumber} />}
              {/* To ALL: Add services */}
              <AddMoreTile />
              {/* To ALL: Remove services */}
              <RemoveTile />
              {/* Mobile introduced and Active */}
              {<ManageContactPreferencesTile />}
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
