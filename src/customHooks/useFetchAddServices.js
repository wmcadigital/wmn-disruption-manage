import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchAddServices = (selectedServices) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(null);

  const dataToSend = {
    // lineId: selectedServices.map((item) => +item.lineId),
    emailDisabled: subscriberState.user.emailDisabled,
  }; // Structure the data before sending

  const addRoutes = () => {
    if (selectedServices) {
      // If lineId is passed in then submit a delete request for that lineId
      fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${subscriberState.query.user}`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            return response.text(); // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then((payload) => {
          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(true);
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload: JSON.parse(payload) }); // Map user details to state
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(false);
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { addRoutes, isFetching, isFetchSuccessful, setIsFetchSuccessful };
};

export default useFetchAddServices;
