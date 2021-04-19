import { useContext, useState } from 'react';
import axios from 'axios';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchDeleteRoute = (data, mode) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const { secret, user } = subscriberState.query; // Destructure state

  let dataToDelete;
  let callback;
  // Set up the data and the callback depending on the mode
  switch (mode) {
    case 'bus':
      dataToDelete = { lineId: [data.id], secret };
      callback = () => {
        subscriberDispatch({
          type: 'REMOVE_LINE_ID',
          payload: data.id,
        });
      };
      break;

    case 'train':
      dataToDelete = { TrainLineId: [data.id] };
      callback = () => {
        subscriberDispatch({
          type: 'REMOVE_TRAIN_LINE',
          payload: data.id,
        });
      };
      break;

    case 'tram':
      if (!data.tramLine) {
        dataToDelete = { TramLines: [data.id] };
        callback = () => {
          subscriberDispatch({
            type: 'REMOVE_TRAM_LINE',
            payload: {
              from: data.from,
              to: data.to,
            },
          });
        };
      } else {
        dataToDelete = { lineId: [data.id], secret };
        callback = () => {
          subscriberDispatch({
            type: 'REMOVE_LINE_ID',
            payload: data.id,
          });
        };
      }
      break;

    default:
      return null;
  }

  const deleteRoute = () => {
    if (!data.id) return;

    axios({
      baseURL: `${process.env.REACT_APP_API_HOST}/api`,
      url: `/person/${user}`,
      method: 'DELETE',
      data: dataToDelete,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        callback(); // Call the corresponding mode's callback to remove the route from localState
      }) // If fetch errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  // Return function and isFetching state to be used outside of custom hook
  return { deleteRoute, isFetching };
};

export default useFetchDeleteRoute;
