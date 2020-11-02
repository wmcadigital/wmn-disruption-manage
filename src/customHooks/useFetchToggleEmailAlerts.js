import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchToggleEmailAlerts = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;
  const [isFetching, setIsFetching] = useState(false);
  const [isToggleDone, setToggleDone] = useState(false);

  const toggleEmailAlerts = (isEmailEnabled) => {
    const dataToSend = {
      emailDisabled: !isEmailEnabled,
    }; // Structure the data before sending

    fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${user}`, {
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
        subscriberDispatch({ type: 'MAP_USER_DETAILS', payload: JSON.parse(payload) }); // Map user details to state
        setIsFetching(false); // set to false as we are done fetching now
        setToggleDone(true);
      }) // If fetch errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });

        setIsFetching(false); // set to false as we are done fetching now
        setToggleDone(false);
      });
  };

  // Return function and isFetching state to be used outside of custom hook
  return { toggleEmailAlerts, isFetching, isToggleDone };
};

export default useFetchToggleEmailAlerts;
