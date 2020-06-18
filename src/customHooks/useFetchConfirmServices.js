import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchConfirmServices = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [confirmServiceIsFinished, setConfirmServiceIsFinished] = useState(false); // Track if fetch request is currently fetching
  const { lines, secret, user } = subscriberState.query; // Destructure state

  const confirmData = { lineId: lines, secret };

  useEffect(() => {
    // If secret and lines is available then user needs to confirm new services. So run fetch if confirmservices has not been completed yet.
    if (!confirmServiceIsFinished && secret && lines.length) {
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
            return response.text(); // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then(() => {
          // When we have confirmed the service(s), update URL to remove lines, lnames as we don't need it anymore (stops another PUT request if user then decides to refresh page)
          delSearchParam('lines');
          delSearchParam('lnames');

          setConfirmServiceIsFinished(true); // set to false as we are done fetching now
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setConfirmServiceIsFinished(true); // set to false as we are done fetching now
        });
    }
    // Else the user doesn't need to confirm service so return that this service is finished
    else {
      setConfirmServiceIsFinished(true);
    }
  }, [confirmData, confirmServiceIsFinished, lines, secret, user]);

  return { confirmServiceIsFinished };
};

export default useFetchConfirmServices;
