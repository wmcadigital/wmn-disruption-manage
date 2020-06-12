import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchConfirmServices = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { lines, secret, user } = subscriberState.query; // Destructure state

  const confirmData = { lineId: lines, secret };

  useEffect(() => {
    // If the user is a newUser then fire off a request to confirm them and their lines
    if (subscriberState.user.newUser) {
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
        method: 'PUT',
        body: JSON.stringify(confirmData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            return response.json(); // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then((data) => {
          console.log({ data });
          setIsFetching(false); // set to false as we are done fetching now
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  }, [confirmData, subscriberState.user.newUser, user]);
};

export default useFetchConfirmServices;
