import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteRoute = (lineId) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { secret, user } = subscriberState.query; // Destructure state

  const removeRoute = () => {
    if (lineId) {
      const confirmData = { lineId: [lineId], secret }; // Structure the data before sending
      // If lineId is passed in then submit a delete request for that lineId
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
        method: 'DELETE',
        body: JSON.stringify(confirmData),
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
          subscriberDispatch({
            type: 'REMOVE_LINE_ID',
            payload: lineId,
          }); // Remove this lineId from local state
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  };

  const removeLine = () => {
    if (lineId) {
      const confirmData = { TrainLineId: [lineId] }; // Structure the data before sending
      // If lineId is passed in then submit a delete request for that lineId
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
        method: 'DELETE',
        body: JSON.stringify(confirmData),
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
          subscriberDispatch({
            type: 'REMOVE_TRAIN_LINE',
            payload: lineId,
          }); // Remove this train line from local state
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setIsFetching(false); // set to false as we are done fetching now
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { removeRoute, removeLine, isFetching };
};

export default useFetchDeleteRoute;
