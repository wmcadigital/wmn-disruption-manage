import { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// State
import { SubscriberContext } from 'globalState/SubscriberContext';
// Hooks

const useFetchAddQuietDays = (selectedQuietDays, resend) => {
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
  const deleteQuietDays = useCallback(() => {
    const QuietDays = selectedQuietDays;
    const dataToDelete = {
      QuietDays,
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
  }, [selectedQuietDays, subscriberState.query.user]);

  const addQuietDays = useCallback(
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
    if (selectedQuietDays && resend) {
      const QuietDays = selectedQuietDays.map((v) => ({ day: v }));
      const dataToAdd = {
        QuietDays,
      }; // Structure the data before sending

      // Start api fetching
      setIsFetching(true);
      const addOtherServices = () => addQuietDays(dataToAdd); // create variable to help readability

      if (resend) {
        addOtherServices();
      } else {
        addOtherServices();
      }
    }
  }, [addQuietDays, deleteQuietDays, resend, selectedQuietDays]);

  // Return function and isFetching state to be used outside of custom hook
  return { isFetching, hasError };
};

export default useFetchAddQuietDays;
