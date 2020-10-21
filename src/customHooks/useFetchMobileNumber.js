import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { getSearchParam } from '../helpers/URLSearchParams';

const useFetchMobileNumber = () => {
  const userId = getSearchParam('user');
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState;
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(null);

  const addPhone = (mobilePhoneNumber) => {
    // resetting variables
    setIsFetching(false);
    setIsFetchSuccessful(null);
    const dataToSend = {
      mobileNumber: mobilePhoneNumber,
    }; // Strucutre the data before sending

    if (mobilePhoneNumber && userId) {
      fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${userId}`, {
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
        .then(() => {
          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(true);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(false);
        });
    }
  };

  const activatePhone = (pin) => {
    // resetting variables
    setIsFetching(false);
    setIsFetchSuccessful(null);
    const dataToSend = {
      PinNumber: pin,
    }; // Strucutre the data before sending

    if (pin && user) {
      fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${userId}`, {
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
        .then(() => {
          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(true);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(false);
        });
    }
    return isFetchSuccessful;
  };

  // Return function and isFetching state to be used outside of custom hook
  return { user, addPhone, activatePhone };
};

export default useFetchMobileNumber;
