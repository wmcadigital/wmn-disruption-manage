/* eslint-disable no-plusplus */
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
      const convertH2M = (timeInHour) => {
        const timeParts = timeInHour.split(':');
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
      };
      // Convert date to correct shape for the api
      const QuietTimes = selectedQuietTimes.map((time) => ({
        StartTime: convertH2M(`${time.startHour}:${time.startMinute}`),
        EndTime: convertH2M(`${time.endHour}:${time.endMinute}`),
      }));

      const format = (n) => {
        // eslint-disable-next-line no-bitwise
        return `${`0${(n / 60) ^ 0}`.slice(-2)}:${`0${n % 60}`.slice(-2)}`;
      };

      const merge = (arr) => {
        const arrFiltered = (r) => {
          return r.EndTime > r.StartTime;
        };
        const arrSorted = arr.filter(arrFiltered);
        const result = arrSorted.sort((a, b) => {
          return a.StartTime - b.StartTime;
        });
        let i = 0;

        while (i < result.length - 1) {
          const current = result[i];
          const next = result[i + 1];
          // check if there is an overlapping
          if (current.EndTime >= next.StartTime) {
            current.EndTime = Math.max(current.EndTime, next.EndTime);
            // remove next
            result.splice(i + 1, 1);
          } else {
            // move to next
            i++;
          }
        }
        return result;
      };

      const results = merge(QuietTimes).map((i) => [format(i.StartTime), format(i.EndTime)]);
      const QuietTimePeriods = results.map((time) => ({
        StartTime: time[0],
        EndTime: time[1],
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
