import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteAccount = (lineId) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { user } = subscriberState.query; // Destructure state

  const deleteAccount = () => {
    if (user) {
      // If lineId is passed in then submit a delete request for that lineId
      fetch(`${process.env.REACT_APP_API_HOST}api/removeme/${user}`, {
        method: 'DELETE',
        body: JSON.stringify({ name: user }),
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
        .then((response) => {
          console.log({ response });
          setIsFetching(false); // set to false as we are done fetching now
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { deleteAccount, isFetching };
};

export default useFetchDeleteAccount;
