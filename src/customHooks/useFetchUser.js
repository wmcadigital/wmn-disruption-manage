import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Context
import { SubscriberContext } from 'globalState/SubscriberContext';
// Helpers
import { getSearchParam } from 'helpers/URLSearchParams';

const useFetchUser = (confirmServiceIsFinished, confirmMobileFinished) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching#
  const [hasError, setHasError] = useState(false); // Track to see if an error occurs

  useEffect(() => {
    // Only start fetching the user if the confirm service has been completed
    if (confirmServiceIsFinished && confirmMobileFinished && getSearchParam('user')) {
      setHasError(null); // Set errors to null
      axios
        .get(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`)
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            const payload = response.data;
            if (payload === 'no account found') setHasError('noAccount');
            subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
            setIsFetching(false); // set to false as we are done fetching now
            return true; // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setHasError('true'); // Set to 'true' as error has occured
          setIsFetching(false); // set to false as we are done fetching now
        });
    }
    // Not a valid URL as no search params exist, so not a valide account
    else {
      setHasError('noAccount');
    }
  }, [
    confirmMobileFinished,
    confirmServiceIsFinished,
    subscriberDispatch,
    subscriberState.query.user,
  ]);

  return { isFetching, hasError };
};

export default useFetchUser;
