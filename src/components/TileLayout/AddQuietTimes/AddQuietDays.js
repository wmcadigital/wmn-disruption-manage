import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
// Custom hooks
import useFetchAddQuietDays from 'customHooks/useFetchAddQuietDays';
import useFilterQuietTimes from 'customHooks/useFilterQuietTimes';
// Context
import { SubscriberContext } from 'globalState/SubscriberContext';

// Components
import Button from 'components/shared/Button/Button';
import Checkboxes from 'components/shared/Checkboxes/Checkboxes';

const AddQuietDays = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { QuietDays } = subscriberState.user;
  const [showDays, setShowDays] = useState(false);
  const [confirmDays, setConfirmDays] = useState(false);
  const [resend, setResend] = useState(false);
  const [selectedQuietDays, setSelectedQuietDays] = useState([]);
  const { isFetching, hasError } = useFetchAddQuietDays(selectedQuietDays, resend);
  const subscribedQuietTimes = useFilterQuietTimes();
  const [days, setDays] = useState(subscribedQuietTimes.subscribedQuietDays);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      subscriberDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          QuietDays: [...days],
        },
      });
    } else {
      mounted.current = false;
    }
    if (resend) setResend(false); // Flip resend back to false so we can press the button again
    if (hasError === false && isFetching === false) {
      setSelectedQuietDays([]);
    }
  }, [days, hasError, isFetching, resend, subscriberDispatch]);
  const checkBoxes = [
    { text: 'Mon', value: 'Monday' },
    { text: 'Tue', value: 'Tuesday' },
    { text: 'Wed', value: 'Wednesday' },
    { text: 'Thu', value: 'Thursday' },
    { text: 'Fri', value: 'Friday' },
    { text: 'Sat', value: 'Saturday' },
    { text: 'Sun', value: 'Sunday' },
  ];
  const callback = useCallback((day) => {
    setDays(day);
  }, []);

  const handleCancelDays = () => {
    setConfirmDays(false);
    setShowDays(false);
  };

  const handleAddDays = () => {
    if (days) {
      subscriberDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          QuietDays: [...days],
        },
      });
    }
    setResend(true);
    setSelectedQuietDays(days);
    setConfirmDays(false);
    setShowDays(false);
  };
  const handleRemoveDays = () => {
    setDays([]);
    setSelectedQuietDays([]);
    subscriberDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietDays: [],
      },
    });
    setResend(true);
    setConfirmDays(false);
    setShowDays(false);
  };
  const handleShowDays = () => {
    setShowDays(true);
    setConfirmDays(true);
  };
  return (
    <>
      <h3 className="wmnds-m-t-sm">Quiet days</h3>
      {(QuietDays && QuietDays.length === []) || QuietDays === undefined ? (
        <p>You will not receive alerts for 24 hours on selected days.</p>
      ) : (
        <p>
          You will not receive alerts on
          {QuietDays.length > 1 ? (
            <span>
              <strong> {QuietDays.slice(0, -1).join(', ')}</strong> and{' '}
            </span>
          ) : (
            ` `
          )}
          <strong>{QuietDays[QuietDays.length - 1]}</strong>.
        </p>
      )}
      {/* Add quiet days button */}
      {!showDays && !confirmDays ? (
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            className="wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm wmnds-col-sm-auto"
            onClick={handleShowDays}
            text={QuietDays && QuietDays.length < 1 ? `Set quiet days` : `Edit your quiet days`}
          />
        </div>
      ) : (
        <div>
          <Checkboxes
            checkboxes={checkBoxes}
            QuietDays={QuietDays}
            parentCallback={callback}
            aria-label="Edit your quiet days"
          />
          <div className="wmnds-m-b-sm">
            <Button
              className="wmnds-text-align-left wmnds-btn wmnds-col-sm-auto"
              onClick={handleAddDays}
              text="Confirm quiet days"
            />
            {QuietDays && QuietDays.length > 0 && (
              <Button
                className="wmnds-text-align-left wmnds-m-l-lg wmnds-btn wmnds-col-sm-auto wmnds-btn--destructive"
                onClick={handleRemoveDays}
                iconRight="general-trash"
                text="Remove quiet days"
              />
            )}
            <Button
              className="wmnds-btn--primary wmnds-m-l-lg wmnds-btn wmnds-col-sm-auto"
              onClick={handleCancelDays}
              text="Cancel"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddQuietDays;
