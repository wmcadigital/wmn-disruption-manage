import { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchSendPin = (resend = false, newMobilePhone = '') => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [sendPinIsFinished, setSendPinIsFinished] = useState(false); // Track if fetch request is currently fetching
  const [sendPinSuccessful, setPinSuccessful] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(
    resend ? subscriberState.user.mobileNumber : subscriberState.query.mobileNumber
  ); // Get the correct mobile number: If resend is true then at that point the mobile number must be in our user state

  const { user } = subscriberState.query; // destructure user(id) from url

  // If new mobile phone number exists then we want to update it
  if (newMobilePhone !== '') {
    setMobileNumber(newMobilePhone); // Change to new phone number
  }

  const dataToSend = {
    mobileNumber: mobileNumber ? `+${mobileNumber.substr(1)}` : null,
  }; // Structure the data before sending

  useEffect(() => {
    if (resend || (!sendPinIsFinished && user && mobileNumber)) {
      setMobileNumber(null); // Set mobileNumber to null once we are in the if statement, as we don't want the if to run again.
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
  }, [dataToSend, mobileNumber, resend, sendPinIsFinished, subscriberDispatch, user]);

  return { sendPinIsFinished, sendPinSuccessful };
};

export default useFetchSendPin;
