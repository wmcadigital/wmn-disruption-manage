import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import axios from 'axios';

const useFetchDeleteAccount = (setIsUnsubscribed) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { user } = subscriberState.query; // Destructure state

  const deleteAccount = () => {
    if (user) {
      setIsFetching(true);
      // If lineId is passed in then submit a delete request for that lineId
      axios({
        url: `/removeme/${user}`,
        baseURL: `${process.env.REACT_APP_API_HOST}/api`,
        method: 'DELETE',
        data: JSON.stringify({ name: user }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200) {
            setIsUnsubscribed(true);
            setIsFetching(false); // set to false as we are done fetching now
            return true; // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          const { status, data } = error.response;
          if (status === 400 && data === 'no account found') {
            setIsUnsubscribed(true);
            setIsFetching(false); // set to false as we are done fetching now
          } else {
            // eslint-disable-next-line no-console
            console.error({ error });
            setIsFetching(false); // set to false as we are done fetching now
          }
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { deleteAccount, isFetching };
};

export default useFetchDeleteAccount;
