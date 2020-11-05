import { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchSendPin = (mobileNumber, resend) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [sendPinIsFinished, setSendPinIsFinished] = useState(false); // Track if fetch request is currently fetching
  const [sendPinSuccessful, setPinSuccessful] = useState(false);
  // const [mobileNumber, setMobileNumber] = useState(
  //   resend && subscriberState.user.mobileNumber
  //     ? subscriberState.user.mobileNumber
  //     : subscriberState.query.mobileNumber
  // ); // Get the correct mobile number: If resend is true then at that point the mobile number must be in our user state

  const { user } = subscriberState.query; // destructure user(id) from url

  // // If new mobile phone number exists then we want to update it
  // if (newMobilePhone !== '') {
  //   setMobileNumber(newMobilePhone); // Change to new phone number
  // }

  useEffect(() => {
    let mounted = true;

    if (((resend && mobileNumber) || (mobileNumber && !sendPinIsFinished && user)) && mounted) {
      const dataToSend = {
        mobileNumber: mobileNumber ? `+${mobileNumber.substr(1)}` : null,
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
  }, [mobileNumber, resend, sendPinIsFinished, subscriberDispatch, user]);

  return { sendPinIsFinished, sendPinSuccessful };
};

export default useFetchSendPin;
