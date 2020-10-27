import { useState, useEffect } from 'react';

// Custom Hooks
import useFetchSendPin from './useFetchSendPin';
import useFetchDeleteMobileNumber from './useFetchDeleteMobileNumber';

const useFetchChangeMobilePhone = () => {
  const { deletePhoneNumber, isNumberDeleted } = useFetchDeleteMobileNumber();
  /* CHANGE NUMBER and SEND CODE */
  /* useFetchSendPin(false, "") initial state - does nothing */
  /* useFetchSendPin(true, "07700900090") saves the new number and send a new message */
  /* useFetchSendPin(false, "") using useEffect we can set the function back to do nothing - right after sending the message */
  const [submittedMobileNumber, setSubmittedMobileNumber] = useState(''); // Used to track if a user has saved the new phone number
  useFetchSendPin(submittedMobileNumber.length > 0, submittedMobileNumber); // Send the current resend status to our fetch so we can send a new text if the user hits resend
  // if the submit button has been pressed, we need to map it back to false so the user can click it again (send it true again)
  useEffect(() => {
    if (submittedMobileNumber) {
      setSubmittedMobileNumber('');
      // setWrongPhoneNumber(false); // set reset mode to false
    }
  }, [submittedMobileNumber]);

  const changeMobileNumber = (phone) => {
    // Delete Phone
    deletePhoneNumber();

    // Check if number has +44
    if (phone && phone.substr(0, 1) === '0') {
      // activates the custom hook in order to save new phone number & send new message
      setSubmittedMobileNumber(`+44${phone.substr(1)}`);
    } else {
      // activates the custom hook in order to save new phone number & send new message
      setSubmittedMobileNumber(phone);
    }
  };

  return { changeMobileNumber };
};

export default useFetchChangeMobilePhone;
