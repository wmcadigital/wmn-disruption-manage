import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteRoute = (data, mode) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { secret, user } = subscriberState.query; // Destructure state

  let confirmData;
  let callback;
  // Set up the data and the callback depending on the mode
  switch (mode) {
    case 'bus':
      confirmData = { lineId: [data.id], secret };
      callback = () => {
        subscriberDispatch({
          type: 'REMOVE_LINE_ID',
          payload: data.id,
        });
      };
      break;

    case 'train':
      confirmData = { TrainLineId: [data.id] };
      callback = () => {
        subscriberDispatch({
          type: 'REMOVE_TRAIN_LINE',
          payload: data.id,
        });
      };
      break;

    case 'tram':
      confirmData = { TramLines: [data.id] };
      callback = () => {
        subscriberDispatch({
          type: 'REMOVE_TRAM_LINE',
          payload: {
            from: data.from,
            to: data.to,
          },
        });
      };
      break;

    default:
      return null;
  }

  const deleteRoute = () => {
    if (!data.id) return;

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
      .then(() => {
        setIsFetching(false);
        callback(); // Call the corresponding mode's callback to remove the route from localState
      }) // If fetch errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });

        setIsFetching(false); // set to false as we are done fetching now
      });
  };

  // Return function and isFetching state to be used outside of custom hook
  return { deleteRoute, isFetching };
};

export default useFetchDeleteRoute;
