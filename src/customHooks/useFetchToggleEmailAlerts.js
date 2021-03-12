import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import axios from 'axios';

const useFetchToggleEmailAlerts = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;
  const [isFetching, setIsFetching] = useState(false);
  const [isToggleDone, setToggleDone] = useState(false);

  const toggleEmailAlerts = (isEmailEnabled) => {
    const dataToSend = {
      emailDisabled: !isEmailEnabled,
    }; // Structure the data before sending

    axios({
      url: `/personlocal/${user}`,
      baseURL: `${process.env.REACT_APP_API_HOST}api`,
      method: 'PUT',
      data: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // If the response is successful(200: OK) or error with validation message(400)
        if (response.status === 200 || response.status === 400) {
          const payload = response.data;
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
          setIsFetching(false); // set to false as we are done fetching now
          setToggleDone(true);
          return true; // Return response as json
        }
        throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
      })
      // If fetch errors
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 400) {
          const payload = data;
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
          setIsFetching(false); // set to false as we are done fetching now
          setToggleDone(true);
        } else {
          // eslint-disable-next-line no-console
          console.error({ error });
          setIsFetching(false); // set to false as we are done fetching now
          setToggleDone(false);
        }
      });
  };

  // Return function and isFetching state to be used outside of custom hook
  return { toggleEmailAlerts, isFetching, isToggleDone };
};

export default useFetchToggleEmailAlerts;
