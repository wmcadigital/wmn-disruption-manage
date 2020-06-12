import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteRoute = (lineId) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext);
  const [isFetching, setIsFetching] = useState(false);
  const { secret } = subscriberState.query;

  const confirmData = { lineId: [lineId], secret };

  const removeRoute = () => {
    if (lineId) {
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`, {
        method: 'DELETE',
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
          subscriberDispatch({ type: 'REMOVE_LINE_ID', payload: lineId }); // remove item from local state
          setIsFetching(false); // set to false as we are done fetching now
        }) // If formsubmission errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  };

  return { removeRoute, isFetching };
};

export default useFetchDeleteRoute;
