import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import components
import Button from 'components/shared/Button/Button';
import TrainAutoCompleteSelectLines from './TrainAutoCompleteSelectLines';
import TrainAutoCompleteInput from './TrainAutoCompleteInput';

const TrainAutoComplete = ({ setSelectedServices, selectedServices, closeAutoComplete }) => {
  const [trainStations, setTrainStations] = useState({ From: null, To: null });
  // Helper function to create setters to set station
  const setStation = (direction) => (station) => {
    setTrainStations((prevState) => {
      return {
        ...prevState,
        [direction]: station,
      };
    });
  };
  // Functions to pass down
  const setTrainStationFrom = setStation('From');
  const setTrainStationTo = setStation('To');
  // Helper boolean
  const bothStationsSelected = trainStations.From && trainStations.To;

  return (
    <div className="wmnds-grid">
      {bothStationsSelected ? (
        <TrainAutoCompleteSelectLines
          trainStations={trainStations}
          setSelectedServices={setSelectedServices}
          selectedServices={selectedServices}
          closeAutoComplete={closeAutoComplete}
        />
      ) : (
        <>
          <div className="wmnds-col-1 wmnds-m-b-xl">
            <h4>Select trains between</h4>
            <TrainAutoCompleteInput
              trainStation={trainStations.From}
              setTrainStation={setTrainStationFrom}
            />
            <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
            <TrainAutoCompleteInput
              trainStation={trainStations.To}
              setTrainStation={setTrainStationTo}
            />
          </div>
          <div className="wmnds-col-1 wmnds-col-md-2-5">
            <Button className="wmnds-btn--primary" text="Cancel" onClick={closeAutoComplete} />
          </div>
        </>
      )}
    </div>
  );
};

TrainAutoComplete.propTypes = {
  selectedServices: PropTypes.shape({
    TramServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    BusServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    Trains: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.string.isRequired,
        From: PropTypes.string.isRequired,
        LineIds: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  closeAutoComplete: PropTypes.func.isRequired,
};

export default TrainAutoComplete;
