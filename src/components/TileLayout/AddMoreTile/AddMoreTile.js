import React, { useState, useEffect, useContext, useMemo } from 'react';
// Custom hooks
import useFetchAddServices from 'customHooks/useFetchAddServices';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Message from 'components/shared/Message/Message';
import Button from 'components/shared/Button/Button';
import WarningText from 'components/shared/WarningText/WarningText';
import useSelectableTramLines from 'customHooks/useSelectableTramLines';
import AutoComplete from './Autocomplete/Autocomplete';
import AddBusService from './AddBusService/AddBusService';
import AddTramService from './AddTramService/AddTramService';
import AddTrainService from './AddTrainService/AddTrainService';
import AddRoadArea from './AddRoadArea/AddRoadArea';

const AddMoreTile = () => {
  // Hooks
  const [subscriberState] = useContext(SubscriberContext);
  const { filterTramLineInfo } = useSelectableTramLines();
  // Selection state
  const initialSelectionState = useMemo(
    () => ({
      BusServices: [],
      TramLines: [],
      LineId: [],
      Trains: [],
      RoadAreas: [],
    }),
    []
  );

  const [selectedServices, setSelectedServices] = useState(initialSelectionState);
  const [mode, setMode] = useState(null);
  const [resend, setResend] = useState(false);
  const { BusServices, TramLines, Trains, LineId, RoadAreas } = selectedServices;
  const { isFetching, hasError } = useFetchAddServices(selectedServices, resend);

  useEffect(() => {
    if (resend) setResend(false); // Flip resend back to false so we can press the button again
    // If there is no error and the api is done fetching then reset the selected services as they are on the users account now
    if (hasError === false && isFetching === false) {
      setSelectedServices(initialSelectionState);
    }
  }, [hasError, initialSelectionState, isFetching, resend]);

  // Helper booleans
  const showContinue =
    ((BusServices && BusServices.length > 0) ||
      (TramLines && TramLines.length > 0) ||
      (LineId && LineId.length > 0) ||
      (Trains && Trains.length > 0) ||
      (RoadAreas && RoadAreas.length > 0)) &&
    !mode;

  // Tram line & stop logic
  const userWillDeleteTramLineSubscription =
    subscriberState.user.tramLines.length && filterTramLineInfo(selectedServices.LineId).length > 0;

  const userWillDeleteTramStopSubscription =
    selectedServices.TramLines.length &&
    filterTramLineInfo(subscriberState.user.lineId.map((line) => line.id)).length > 0;

  const showTramLineWarning =
    (userWillDeleteTramLineSubscription || userWillDeleteTramStopSubscription) === true;

  const warningMessage = userWillDeleteTramLineSubscription
    ? 'Selecting the entire tram line will remove your current stop-by-stop alerts'
    : 'Selecting tram stops will remove your current full tram line alerts';

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>

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
      <p>We&apos;ll send an automatic disruption alert for each service you add.</p>
      {/* Searching for a service to add */}
      {mode ? (
        <AutoComplete
          mode={mode}
          setMode={setMode}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
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
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          {/* Tram warning */}
          {showTramLineWarning && (
            <div className="wmnds-grid">
              <div className="wmnds-col-md-7-8">
                <WarningText type="warning" message={warningMessage} className="wmnds-p-r-sm" />
              </div>
            </div>
          )}

          <AddTrainService
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          <AddRoadArea
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        </>
      )}

      {/* Continue button */}
      {showContinue && (
        <div className="wmnds-col-1">
          <Button
            className="wmnds-btn wmnds-col-1 wmnds-col-lg-1-2 wmnds-m-t-xl"
            disabled={isFetching}
            isFetching={isFetching}
            text="Confirm new subscriptions"
            onClick={() => setResend(true)}
            iconRight="general-chevron-right"
          />
        </div>
      )}
    </div>
  );
};

export default AddMoreTile;
