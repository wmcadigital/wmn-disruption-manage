import React from 'react';
import PropTypes from 'prop-types';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';
import TramAutoComplete from './TramAutoComplete/TramAutoComplete';

const AutoComplete = ({ mode, setMode, setSelectedServices, selectedServices }) => {
  // Used to close any mode's autoComplete, if the global state has not been updated then this will clear what the user's progress
  const closeAutoComplete = () => {
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

    switch (mode) {
      case 'bus':
        return (
          <>
            {autoCompleteTitle(`Search for a ${mode} service`)}
            <BusAutoComplete
              setSelectedServices={setSelectedServices}
              closeAutoComplete={closeAutoComplete}
            />
          </>
        );

      case 'train':
        return (
          <TrainAutoComplete
            mode={mode}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
            closeAutoComplete={closeAutoComplete}
          />
        );

      case 'tram':
        return (
          <TramAutoComplete
            setSelectedServices={setSelectedServices}
            closeAutoComplete={closeAutoComplete}
          />
        );

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <div className="wmnds-grid">{autoCompleteToShow()}</div>;
};

AutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  selectedServices: PropTypes.shape({
    TramLines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
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
};

export default AutoComplete;
