import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import axios from 'axios';

const useFetchDeleteMobileNumber = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isNumberDeleted, setIsNumberDeleted] = useState(false);
  const [errors, setErrors] = useState(false);

  const deletePhoneNumber = (updateUser = true) => {
    const dataToSend = {
      RemoveMobile: 'any text',
    }; // Structure the data before sending
    setIsDeleting(true);
    if (user) {
      axios({
        url: `/person/${user}`,
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'DELETE',
        data: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200) {
            if (updateUser) {
              subscriberDispatch({ type: 'REMOVE_MOBILE', payload: '' });
            }
            setIsDeleting(false);
            setIsNumberDeleted(true);
            return true; // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          const { status } = error.response;
          if (status === 400) {
            if (updateUser) {
              subscriberDispatch({ type: 'REMOVE_MOBILE', payload: '' });
            }
            setIsDeleting(false);
            setIsNumberDeleted(true);
          } else {
            // eslint-disable-next-line no-console
            console.error({ error });
            setIsDeleting(false);
            setErrors(true);
          }
        });
    }
  };

  return { errors, deletePhoneNumber, isDeleting, isNumberDeleted };
};

export default useFetchDeleteMobileNumber;
