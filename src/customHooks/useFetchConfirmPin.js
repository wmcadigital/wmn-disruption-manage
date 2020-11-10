import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchConfirmPin = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false);
  const [confirmPinIsFinished, setConfirmPinIsFinished] = useState(false); // Track if fetch request is currently fetching
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user } = subscriberState.query;
  const [errors, setErrors] = useState(null);

  const confirmPin = (pin) => {
    const dataToSend = {
      PinNumber: pin,
    }; // Structure the data before sending
    setErrors(false);
    if (pin && user) {
      fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${user}`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK)
          if (response.status === 200) {
            return response.text(); // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then((payload) => {
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload: JSON.parse(payload) }); // Map user details to state
          subscriberDispatch({ type: 'ADD_PIN_CONFIRMATION_MESSAGE', payload: true });
          setShowSuccessMessage(true);
          setIsFetching(false);
          setConfirmPinIsFinished(true);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setConfirmPinIsFinished(true);
          setIsFetching(false);
          setErrors(true);
        });
    }
  };

  return { confirmPinIsFinished, errors, confirmPin, isFetching, showSuccessMessage };
};

export default useFetchConfirmPin;
