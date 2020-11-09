import React, { useState } from 'react';
// Custom hooks
import useFetchAddServices from 'customHooks/useFetchAddServices';
// Components
import Message from 'components/shared/Message/Message';
import GenericError from 'components/shared/Errors/GenericError';
import Button from 'components/shared/Button/Button';
import AddBusService from './AddBusService/AddBusService';
import AddTramService from './AddTramService/AddTramService';
import AutoComplete from './Autocomplete/Autocomplete';
import AddTrainService from './AddTrainService/AddTrainService';

const AddMoreTile = () => {
  const [selectedServices, setSelectedServices] = useState({
    BusServices: [],
    TramServices: [],
    LineId: [],
    Trains: [],
  });
  const [mode, setMode] = useState(null);

  const { BusServices, TramServices, Trains } = selectedServices;

  const { addRoutes, isFetching, isFetchSuccessful, setIsFetchSuccessful } = useFetchAddServices(
    selectedServices
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);

  if (isFetchSuccessful) {
    setSelectedServices({});
    setShowSuccessMessage(true);
    setIsFetchSuccessful(null);
  } else if (isFetchSuccessful === false) {
    setSelectedServices({});
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

      {/* Add services */}
      <p>We&apos;ll send an automatic disruption alert for each service you add.</p>
      {/* Searching for a service to add */}
      {mode ? (
        <AutoComplete
          mode={mode}
          setSelectedServices={setSelectedServices}
          setMode={setMode}
          selectedServices={selectedServices}
        />
      ) : (
        <>
          {/* Show buttons and chosen services to be added */}
          <AddBusService
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          <AddTramService
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          <AddTrainService
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        </>
      )}

      {/* Add button to confirm new subscriptions */}

      {/* Continue button */}
      {((BusServices && BusServices.length > 0) ||
        (TramServices && TramServices.length > 0) ||
        (Trains && Trains.length > 0)) &&
        !mode && (
          <Button
            className="wmnds-btn wmnds-col-1 wmnds-m-t-xl"
            disabled={isFetching}
            isFetching={isFetching}
            text="Confirm new subscriptions"
            onClick={addRoutes}
            iconRight="general-chevron-right"
          />
        )}
    </div>
  );
};

export default AddMoreTile;
