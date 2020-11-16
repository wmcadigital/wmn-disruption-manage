import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';
import axios from 'axios';

const useFetchAddTrains = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [addTrainsIsFinished, setAddTrainsIsFinished] = useState(false); // Track if fetch request is currently fetching
  const { trains, user, emailDisabled } = subscriberState.query; // Destructure state

  useEffect(() => {
    const confirmData = { trains, emailDisabled };
    // If secret and lines is available then user needs to confirm new services. So run fetch if confirmservices has not been completed yet.
    if (!addTrainsIsFinished && trains.length) {
      axios({
        url: `/personlocal/${subscriberState.query.user}`,
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'PUT',
        data: JSON.stringify(confirmData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            // When we have confirmed the service(s), update URL to remove lines, lnames as we don't need it anymore (stops another PUT request if user then decides to refresh page)
            delSearchParam('trains');
            delSearchParam('nomail');
            setAddTrainsIsFinished(true); // set to false as we are done fetching now
            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setAddTrainsIsFinished(true); // set to false as we are done fetching now
        });
    }
    // Else the user doesn't need to confirm service so return that this service is finished
    else {
      setAddTrainsIsFinished(true);
    }
  }, [addTrainsIsFinished, trains, user, emailDisabled, subscriberState.query.user]);

  return { addTrainsIsFinished };
};

export default useFetchAddTrains;
