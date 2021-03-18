import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchConfirmServices = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [confirmServiceIsFinished, setConfirmServiceIsFinished] = useState(false); // Track if fetch request is currently fetching
  const { lines, trains, trams, secret, user, emailDisabled } = subscriberState.query; // Destructure state

  useEffect(() => {
    const confirmData = { lineId: lines, secret, trains, TramLines: trams, emailDisabled };
    // If secret and lines is available then user needs to confirm new services. So run fetch if confirmservices has not been completed yet.
    if (!confirmServiceIsFinished && secret && (lines.length || trains.length || trams.length)) {
      axios({
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        url: `/personlocal/${user}`,
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
            delSearchParam('lines');
            delSearchParam('lnames');
            delSearchParam('trains');
            delSearchParam('tram');
            delSearchParam('nomail');
            setConfirmServiceIsFinished(true); // set to false as we are done fetching now
            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then(() => {
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
  }, [confirmServiceIsFinished, lines, trains, trams, secret, user, emailDisabled]);

  return { confirmServiceIsFinished };
};

export default useFetchConfirmServices;
