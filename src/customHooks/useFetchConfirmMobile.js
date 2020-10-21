import { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchConfirmMobile = (resend = false) => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext

  const [confirmMobileIsFinished, setConfirmMobileIsFinished] = useState(false); // Track if fetch request is currently fetching

  const { user } = subscriberState.query;
  const { mobileNumber } = resend ? subscriberState.user : subscriberState.query;

  // resetting variables
  const dataToSend = {
    mobileNumber: mobileNumber ? `+${mobileNumber.substr(1)}` : null,
  }; // Strucutre the data before sending
  useEffect(() => {
    if (resend || (!confirmMobileIsFinished && user && subscriberState.query.mobileNumber)) {
      console.log('running resend')

      fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${user}`, {
        method: 'PUT',
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
          delSearchParam('mobi');
          delSearchParam('nomail');

          setConfirmMobileIsFinished(true);
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });

          setConfirmMobileIsFinished(true);
        });
    } else {
      setConfirmMobileIsFinished(true);
    }
  }, [
    confirmMobileIsFinished,
    dataToSend,
    mobileNumber,
    resend,
    subscriberState.query.mobileNumber,
    user,
  ]);

  return { confirmMobileIsFinished };
};

export default useFetchConfirmMobile;
