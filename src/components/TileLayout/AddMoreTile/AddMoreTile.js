import React, { useState, useEffect } from 'react';
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
  const [resend, setResend] = useState(false);
  const { BusServices, TramServices, Trains } = selectedServices;
  const { isFetching, hasError } = useFetchAddServices(selectedServices, resend);

  useEffect(() => {
    if (resend) setResend(false); // Flip resend back to false so we can press the button again
    // If there is no error and the api is done fetching then reset the selected services as they are on the users account now
    if (hasError === false && isFetching === false) {
      setSelectedServices({
        BusServices: [],
        TramServices: [],
        LineId: [],
        Trains: [],
      });
    }
  }, [hasError, isFetching, resend]);

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>

      {hasError === false && (
        <Message
          title="Service(s) added successfully"
          message="We’ll send an automatic disruption alert for each service you add."
          className="wmnds-col-1 wmnds-m-b-lg"
          hasCloseButton
        />
      )}

      {hasError && (
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
            className="wmnds-btn wmnds-col-1 wmnds-col-lg-1-2 wmnds-m-t-xl"
            disabled={isFetching}
            isFetching={isFetching}
            text="Confirm new subscriptions"
            onClick={() => setResend(true)}
            iconRight="general-chevron-right"
          />
        )}
    </div>
  );
};

export default AddMoreTile;
