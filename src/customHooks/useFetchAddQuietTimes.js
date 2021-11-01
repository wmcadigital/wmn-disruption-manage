import { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// State
import { SubscriberContext } from 'globalState/SubscriberContext';
// Hooks

const useFetchAddQuietTimes = (selectedQuietTimes, resend) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [hasError, setHasError] = useState(null);
  // Fetching functions
  const finishFetching = () => setIsFetching(false);
  const catchErrors = (error) => {
    // eslint-disable-next-line no-console
    console.error({ error });
    setHasError(true);
  };
  const deleteQuietTimes = useCallback(() => {
    const QuietTimePeriods = selectedQuietTimes;
    const dataToDelete = {
      QuietTimePeriods,
    };
    return axios({
      baseURL: `${process.env.REACT_APP_API_HOST}/api`,
      url: `/personlocal/${subscriberState.query.user}`,
      method: 'DELETE',
      data: dataToDelete,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(catchErrors);
  }, [selectedQuietTimes, subscriberState.query.user]);

  const addQuietTimes = useCallback(
    (data) =>
      axios({
        baseURL: `${process.env.REACT_APP_API_HOST}/api`,
        url: `/personlocal/${subscriberState.query.user}`,
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText, response.Message);
          }
          // If the PUT was successful
          setHasError(false);
        })
        .catch(catchErrors)
        .finally(finishFetching),
    [subscriberState.query.user]
  );

  useEffect(() => {
    if (selectedQuietTimes && resend) {
      // Convert date to correct shape for the api
      const date = new Date().toISOString().slice(0, 10);
      const QuietTimePeriods = selectedQuietTimes.map((time) => ({
        StartTime: `${date}T${time.startHour}:${time.startMinute}:00`,
        EndTime: `${date}T${time.endHour}:${time.endMinute}:00`,
      }));

      const dataToAdd = {
        QuietTimePeriods,
      }; // Structure the data before sending

      // Start api fetching
      setIsFetching(true);
      const addOtherServices = () => addQuietTimes(dataToAdd); // create variable to help readability

      if (resend) {
        addOtherServices();
      }
    }
  }, [addQuietTimes, deleteQuietTimes, resend, selectedQuietTimes]);

  // Return function and isFetching state to be used outside of custom hook
  return { isFetching, hasError };
};

export default useFetchAddQuietTimes;
