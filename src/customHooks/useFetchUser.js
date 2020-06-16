import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchUser = (confirmServiceIsFinished) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching#
  const [hasError, setHasError] = useState(false); // Track to see if an error occurs

  useEffect(() => {
    // Only start fetching the user if the confirm service has been completed
    if (confirmServiceIsFinished && window.location.search) {
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`)
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200) {
            return response.json(); // Return response as json
          }
          if (response.status === 400) {
            return response.text();
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then((payload) => {
          if (payload === 'no account found') setHasError('noAccount');
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
          setIsFetching(false); // set to false as we are done fetching now
        }) // If fetch errors
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
  }, [confirmServiceIsFinished, subscriberDispatch, subscriberState.query.user]);

  return { isFetching, hasError };
};

export default useFetchUser;
