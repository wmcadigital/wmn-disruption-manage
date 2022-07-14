import React, { useState, useContext, useEffect } from 'react';
// Context
import { SubscriberContext } from 'globalState/SubscriberContext';
// Custom hooks
import useFetchAddQuietTimes from 'customHooks/useFetchAddQuietTimes';
import useFilterQuietTimes from 'customHooks/useFilterQuietTimes';

// Components
import Button from 'components/shared/Button/Button';
import QuietHoursComponent from './QuietHoursComponent';
import HoursMinutes from './HoursMinutes';

const AddQuietHours = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const subscribedQuietTimes = useFilterQuietTimes();
  const QuietHours = subscriberState.user.QuietHours || subscribedQuietTimes.subscribedQuietHours;

  const [showHours, setShowHours] = useState(false);
  const [times, setTimes] = useState({
    id: `${Math.random()}`,
    startHour: '00',
    startMinute: '00',
    endHour: '00',
    endMinute: '00',
  });
  const [resend, setResend] = useState(false);
  const [mount, setMount] = useState(true);
  const [selectedQuietTimes, setSelectedQuietTimes] = useState();
  const { isFetching, hasError } = useFetchAddQuietTimes(selectedQuietTimes, resend);
  useEffect(() => {
    if (mount) {
      subscriberDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          QuietHours: [...subscribedQuietTimes.subscribedQuietHours],
        },
      });
      setMount(false);
    }
    if (resend) setResend(false); // Flip remove back to false so we can press the button again
  }, [
    hasError,
    isFetching,
    selectedQuietTimes,
    resend,
    subscriberDispatch,
    QuietHours,
    times,
    mount,
    subscribedQuietTimes,
  ]);

  const handleConfirmHours = () => {
    setShowHours(false);
    setResend(true);
    setSelectedQuietTimes(QuietHours);
  };

  const handleAddHours = () => {
    setTimes({
      id: `${Math.random()}`,
      startHour: '00',
      startMinute: '00',
      endHour: '00',
      endMinute: '00',
    });
    subscriberDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietHours: [...QuietHours, times],
      },
    });
  };
  const handleShowHours = () => {
    setShowHours(true);
    subscriberDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietHours: [...QuietHours],
      },
    });
    if (QuietHours && QuietHours.length < 1) {
      handleAddHours();
    }
  };
  const handleCancelHours = () => {
    setShowHours(false);
    subscriberDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietHours: [...subscribedQuietTimes.subscribedQuietHours],
      },
    });
  };
  return (
    <>
      <div>
        {/* Subsection */}
        <h3 className="wmnds-p-t-md">Daily quiet hours</h3>
        {QuietHours && QuietHours.length <= 0 ? (
          <p>You will not receive alerts at the selected times.</p>
        ) : (
          <p>
            You will not receive alerts between
            <HoursMinutes times={QuietHours} />.
          </p>
        )}
        {/* Add quiet hours button */}
        {!showHours || (QuietHours && QuietHours.length < 0) ? (
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <Button
              className="wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm wmnds-btn wmnds-col-sm-auto"
              onClick={handleShowHours}
              text={
                QuietHours && QuietHours.length < 1 ? `Set quiet hours` : `Edit your quiet hours`
              }
            />
          </div>
        ) : (
          <div>
            {/* Show the quiet hours the user has added */}
            {QuietHours && QuietHours.length > 0 && (
              <>
                {QuietHours.map((quietHours) => {
                  return (
                    <QuietHoursComponent
                      mode="quietHours"
                      quietHours={quietHours}
                      name={`${quietHours.id}`}
                      key={`${quietHours.id}`}
                    />
                  );
                })}
              </>
            )}
            <div className="wmnds-m-t-sm">
              {QuietHours && QuietHours.length < 10 && (
                <Button
                  className="wmnds-btn--secondary wmnds-text-align-left wmnds-m-r-lg wmnds-m-b-sm"
                  onClick={handleAddHours}
                  text="Add another time"
                  iconRight="general-expand"
                />
              )}
              <Button
                className="wmnds-text-align-left wmnds-btn--primary wmnds-m-r-lg"
                onClick={handleCancelHours}
                text="Cancel"
              />
              <Button
                className="wmnds-text-align-left"
                onClick={handleConfirmHours}
                text="Confirm quiet hours"
              />
            </div>
          </div>
        )}
        <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
      </div>
    </>
  );
};

export default AddQuietHours;
