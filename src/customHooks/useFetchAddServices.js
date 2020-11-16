import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import axios from 'axios';

const useFetchAddServices = (selectedServices, resend) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    if (selectedServices && resend) {
      const { Trains, LineId } = selectedServices;

      const lineIdsToSubmit = LineId.length > 0 ? LineId : null;

      const dataToSend = {
        LineId: lineIdsToSubmit,
        Trains,
        emailDisabled: subscriberState.user.emailDisabled,
      }; // Structure the data before sending

      setIsFetching(true);
      // If lineId is passed in then submit a delete request for that lineId
      axios({
        url: `/personlocal/${subscriberState.query.user}`,
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'PUT',
        data: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200) {
            const payload = response.data; // Return response as json
            setIsFetching(false); // set to false as we are done fetching now
            setHasError(false);
            subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
          setHasError(true);
        });
    }
  }, [
    resend,
    selectedServices,
    subscriberDispatch,
    subscriberState.query.user,
    subscriberState.user.emailDisabled,
  ]);

  // Return function and isFetching state to be used outside of custom hook
  return { isFetching, hasError };
};

export default useFetchAddServices;
