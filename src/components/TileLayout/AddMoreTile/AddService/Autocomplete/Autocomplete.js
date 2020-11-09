import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import components
import Button from 'components/shared/Button/Button';
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import TrainAutoCompleteSelectLines from './TrainAutoComplete/TrainAutoCompleteSelectLines/TrainAutoCompleteSelectLines';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';

const AutoComplete = ({ mode, setMode, setSelectedServices, selectedServices }) => {
  const [trainStations, setTrainStations] = useState({});

  // Used to go back to previous step and wipes any trainStations (local state) data stored
  const getPreviousStep = () => {
    setMode(null);
  };

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <label className="wmnds-fe-label wmnds-col-1" htmlFor={`${mode}Search`}>
          <strong>{text}</strong>
        </label>
      );
    };

    return (
      <div className="wmnds-grid">
        {mode === 'bus' && (
          <>
            {autoCompleteTitle(`Search for a ${mode} service`)}
            <BusAutoComplete
              mode={mode}
              setMode={setMode}
              setSelectedServices={setSelectedServices}
            />
          </>
        )}

        {mode === 'train' && (
          <>
            {(!trainStations.From || !trainStations.To) && (
              <div className="wmnds-col-1 wmnds-m-b-xl">
                <h4>Select trains between</h4>
                <TrainAutoComplete
                  mode={mode}
                  setMode={setMode}
                  trainStations={trainStations}
                  setTrainStations={setTrainStations}
                />
                <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
                <TrainAutoComplete
                  mode={mode}
                  setMode={setMode}
                  trainStations={trainStations}
                  setTrainStations={setTrainStations}
                  to
                />
              </div>
            )}

            {trainStations.From && trainStations.To && (
              <TrainAutoCompleteSelectLines
                setMode={setMode}
                trainStations={trainStations}
                setSelectedServices={setSelectedServices}
                selectedServices={selectedServices}
              />
            )}

            {(!trainStations.From || !trainStations.To) && (
              // Add cancel button
              <div className="wmnds-col-1 wmnds-col-md-2-5">
                <Button
                  btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
                  text="Cancel"
                  onClick={getPreviousStep}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

AutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  selectedServices: PropTypes.shape(PropTypes.any).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AutoComplete;
