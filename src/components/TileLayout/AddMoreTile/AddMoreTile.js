import React, { useState } from 'react';
// Custom hooks
import useFetchAddServices from 'customHooks/useFetchAddServices';
// Components
import Message from 'components/shared/Message/Message';
import GenericError from 'components/shared/Errors/GenericError';
import Button from 'components/shared/Button/Button';
import AddService from './AddService/AddService';

const AddMoreTile = () => {
  const [selectedServices, setSelectedServices] = useState({
    LineId: [],
    Trains: [],
  });
  const { addRoutes, isFetching, isFetchSuccessful, setIsFetchSuccessful } = useFetchAddServices(
    selectedServices
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);

  if (isFetchSuccessful) {
    setSelectedServices([]);
    setShowSuccessMessage(true);
    setIsFetchSuccessful(null);
  } else if (isFetchSuccessful === false) {
    setSelectedServices([]);
    setShowSuccessMessage(false);
    setIsFetchSuccessful(null);
  }

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>

      {showSuccessMessage && (
        <Message
          title="Service(s) added successfully"
          message="We’ll send an automatic disruption alert for each service you add."
          className="wmnds-col-1 wmnds-m-b-lg"
          hasCloseButton
        />
      )}

      {showSuccessMessage === false && (
        <GenericError
          title="Services subscription failed"
          desc="Apologies, we are having technical difficulties. Try again later."
        />
      )}

      <AddService
        isFetching={isFetching}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        addRoutes={addRoutes}
      />

      {/* Add button to confirm new subscriptions */}
      <Button
        className="wmnds-col-1 wmnds-col-md-1-2"
        disabled={isFetching}
        isFetching={isFetching}
        text="Confirm new subscriptions"
        onClick={addRoutes}
        iconRight="general-chevron-right"
      />
    </div>
  );
};

export default AddMoreTile;
