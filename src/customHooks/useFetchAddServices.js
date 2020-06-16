import { useContext, useState } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchAddServices = (selectedBuses) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(null);
  const { email, name } = subscriberState.user; // Destructure state

  const dataToSend = {
    Name: name,
    Email: email,
    LineId: selectedBuses.map((item) => +item.lineId),
  }; // Strucutre the data before sending

  const addRoutes = () => {
    if (selectedBuses) {
      // If lineId is passed in then submit a delete request for that lineId
      fetch(`${process.env.REACT_APP_API_HOST}api/SignUp`, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
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
          setIsFetchSuccessful(true);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setIsFetching(false); // set to false as we are done fetching now
          setIsFetchSuccessful(false);
        });
    }
  };

  // Return function and isFetching state to be used outside of custom hook
  return { addRoutes, isFetching, isFetchSuccessful };
};

export default useFetchAddServices;
