import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchConfirmServices = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext);
  const [isFetching, setIsFetching] = useState(false);
  const { lines, secret } = subscriberState.query;

  const confirmData = { lineId: lines, secret };

  useEffect(() => {
    // If the user is a newUser then fire off a request to confirm them and their lines
    if (subscriberState.user.newUser) {
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`, {
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
        // If formsubmission is successful
        .then((data) => {
          console.log({ data });
          setIsFetching(false); // set to false as we are done fetching now
        }) // If formsubmission errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  }, [confirmData, subscriberDispatch, subscriberState.query.user, subscriberState.user.newUser]);
};

export default useFetchConfirmServices;
