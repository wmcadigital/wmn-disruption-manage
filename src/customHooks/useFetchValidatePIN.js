import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import axios from 'axios';

const useFetchValidatePIN = (pin) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(null);
  const { email, name } = subscriberState.user; // Destructure state

  const dataToSend = {
    Name: name,
    Email: email,
    PinNumber: pin,
  }; // Structure the data before sending

  const validatePIN = () => {
    if (pin) {
      // If lineId is passed in then submit a delete request for that lineId
      axios({
        url: `/SignUp`,
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'POST',
        data: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            setIsFetching(false); // set to false as we are done fetching now
            setIsFetchSuccessful(true);
            return true; // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(false);
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { validatePIN, isFetching, isFetchSuccessful };
};

export default useFetchValidatePIN;
