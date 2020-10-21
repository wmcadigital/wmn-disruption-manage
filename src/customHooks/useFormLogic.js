import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Import components
import Button from '../components/shared/Button/Button';

const useFormLogic = () => {
  const { register, errors, getValues, triggerValidation } = useForm(); // Get useForm methods
  const [isSubmitPressed, setIsSubmitPressed] = useState(false); // State for tracking if continue has been pressed

  const handleValidation = async (event) => {
    event.preventDefault();

    const result = await triggerValidation();
    setIsSubmitPressed(true);

    // if no errors
    if (result) {
      console.log('no errors. submitted with success');
      console.log(getValues());
      // formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: getValues() });
    }
    // else, errors are true...
    else {
      console.log('errors');
      // window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    }
    return result;
  };

  // Submit button
  const submitButton = (text) => {
    return <Button btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md" type="submit" text={text} />;
  };

  return {
    register,
    handleValidation,
    submitButton,
    triggerValidation,
    errors,
    getValues,
  };
};

export default useFormLogic;
