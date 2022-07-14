import React, { useRef } from 'react';
// Import custom hooks
// Import components
import Message from 'components/shared/Message/Message';
import AddQuietHours from './AddQuietHours';
import AddQuietDays from './AddQuietDays';

const AddQuietTimes = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { hasError } = [];

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Choose when you recieve disruption alerts</h2>
      <p>Set quiet hours and days so you only receive alerts when it’s best for you.</p>
      {hasError === false && (
        <Message
          title="Service(s) added successfully"
          message="We’ll send an automatic disruption alert for each service you add."
          className="wmnds-m-b-lg"
          hasCloseButton
        />
      )}

      {hasError && (
        <Message
          title="Services subscription failed"
          message="Apologies, we are having technical difficulties. Try again later."
          className="wmnds-m-b-lg"
          type="error"
        />
      )}

      {/* Add services */}
      <form ref={formRef} autoComplete="on">
        <fieldset className="wmnds-fe-fieldset wmnds-col-1">
          <AddQuietHours />
          <AddQuietDays />
        </fieldset>
      </form>
    </div>
  );
};

export default AddQuietTimes;
