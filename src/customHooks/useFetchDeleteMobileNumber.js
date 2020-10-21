import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteMobileNumber = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;

  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState(false);

  const deletePhoneNumber = () => {
    const dataToSend = {
      RemoveMobile: '',
    }; // Strucutre the data before sending

    if (user) {
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
        method: 'DELETE',
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
          setIsFetching(false);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setIsFetching(false);
          setErrors(true);
        });
    }
  };

  return { errors, deletePhoneNumber, isFetching };
};

export default useFetchDeleteMobileNumber;
