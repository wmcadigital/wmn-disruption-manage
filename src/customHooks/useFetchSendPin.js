import { useState, useContext, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchSendPin = (resend = false, newMobilePhone = '') => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [sendPinIsFinished, setSendPinIsFinished] = useState(false); // Track if fetch request is currently fetching
  const [sendPinSuccessful, setPinSuccessful] = useState(false);
  const { user } = subscriberState.query;
  const [flagToAvoidMultipleMessages, setFlagToAvoidMultipleMessages] = useState(false);

  let { mobileNumber } = resend ? subscriberState.user : subscriberState.query;
  if (newMobilePhone !== '') {
    mobileNumber = newMobilePhone;
  }
  
  const dataToSend = {
    mobileNumber: mobileNumber ? `+${mobileNumber.substr(1)}` : null,
  }; // Structure the data before sending
  useEffect(() => {
    if (
      (resend) ||
      (!flagToAvoidMultipleMessages &&
        !sendPinIsFinished &&
        user &&
        subscriberState.query.mobileNumber)
    ) {
      setFlagToAvoidMultipleMessages(true);
      console.log("waiting for adding phone... "+mobileNumber);
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
          setPinSuccessful(false);
          setSendPinIsFinished(true);
        });
    } else {
      setSendPinIsFinished(true);
    }
  }, [
    sendPinIsFinished,
    dataToSend,
    mobileNumber,
    resend,
    subscriberState.query.mobileNumber,
    user,
    flagToAvoidMultipleMessages,
  ]);

  return { sendPinIsFinished, sendPinSuccessful };
};

export default useFetchSendPin;
