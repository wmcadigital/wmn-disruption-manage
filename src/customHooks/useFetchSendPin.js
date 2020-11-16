import { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';
import { includeCountryCode } from 'helpers/MobilePhoneConversors';

const useFetchSendPin = (mobile, resend) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [sendPinIsFinished, setSendPinIsFinished] = useState(null); // Track if fetch request is currently fetching
  const [sendPinSuccessful, setPinSuccessful] = useState(null);
  const { user, emailDisabled } = subscriberState.query; // destructure user(id) from url
  let mobileNumber = mobile;
  if (mobileNumber && mobileNumber.substr(0, 1) === '0') {
    // if number provided doesn't have country code, it will force it to have
    mobileNumber = includeCountryCode(mobileNumber);
  }

  useEffect(() => {
    let mounted = true;

    if (((resend && mobileNumber) || (mobileNumber && !sendPinIsFinished && user)) && mounted) {
      const dataToSend = {
        emailDisabled,
        mobileNumber: mobileNumber ? `+${mobileNumber.substr(1)}` : null, // to avoid error reading it directly from the url (plus is replaced by a space)
      }; // Structure the data before sending

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
        .then((payload) => {
          delSearchParam('mobi');
          delSearchParam('nomail');
          setPinSuccessful(true);
          setSendPinIsFinished(true);
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload: JSON.parse(payload) }); // Map user details to state
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setPinSuccessful(false);
          setSendPinIsFinished(true);
        });
    } else {
      setSendPinIsFinished(true);
    }

    return () => {
      mounted = false;
    };
  }, [emailDisabled, mobileNumber, resend, sendPinIsFinished, subscriberDispatch, user]);

  return { sendPinIsFinished, sendPinSuccessful };
};

export default useFetchSendPin;
