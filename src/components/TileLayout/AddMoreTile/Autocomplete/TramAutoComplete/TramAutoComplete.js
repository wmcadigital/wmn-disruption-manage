import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import components
import Button from 'components/shared/Button/Button';
import TramAutoCompleteInput from './TramAutoCompleteInput';

const TramAutoComplete = ({ setSelectedServices, closeAutoComplete }) => {
  const [tramStops, setTramStops] = useState({ From: null, To: null });
  // Helper function to create setters to set each stop
  const setStop = (direction) => (stop) => {
    setTramStops((prevState) => {
      return {
        ...prevState,
        [direction]: stop,
      };
    });
  };
  // Functions to pass down
  const setTramStopFrom = setStop('From');
  const setTramStopTo = setStop('To');

  const selectTramLines = () => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        TramLines: [...prevState.TramLines, tramStops],
      };
    });
    closeAutoComplete();
  };

  const bothStopsSelected = tramStops.From && tramStops.To; // Helper to toggle between buttons

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1 wmnds-m-b-xl">
        <h4>Select tram stops between</h4>
        <TramAutoCompleteInput tramStop={tramStops.From} setTramStop={setTramStopFrom} />
        <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
        <TramAutoCompleteInput tramStop={tramStops.To} setTramStop={setTramStopTo} />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-2-5">
        {bothStopsSelected ? (
          <Button text="Continue" onClick={selectTramLines} />
        ) : (
          <Button className="wmnds-btn--primary" text="Cancel" onClick={closeAutoComplete} />
        )}
      </div>
    </div>
  );
};

TramAutoComplete.propTypes = {
  setSelectedServices: PropTypes.func.isRequired,
  closeAutoComplete: PropTypes.func.isRequired,
};

export default TramAutoComplete;
