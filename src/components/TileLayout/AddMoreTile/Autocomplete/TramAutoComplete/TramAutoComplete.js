import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Import components
import Button from 'components/shared/Button/Button';
import WarningText from 'components/shared/WarningText/WarningText';
import TramAutoCompleteInput from './TramAutoCompleteInput';
import TramAutoCompleteSelectLine from './TramAutoCompleteSelectLine';

const TramAutoComplete = ({ selectedServices, setSelectedServices, closeAutoComplete }) => {
  const [tramStops, setTramStops] = useState({ From: null, To: null });
  const [selectedLines, setSelectedLines] = useState([]);
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

  // Function for updating local tramLines state
  const setSelectedTramLines = useCallback((lineIds) => setSelectedLines(lineIds), []);

  const selectTramOptions = () => {
    const { TramLines, LineId } = selectedServices;
    let newTramLines;
    let newLineIds;

    if (selectedLines.length) {
      newTramLines = [];
      newLineIds = [...LineId, ...selectedLines];
    } else {
      newTramLines = [...TramLines, tramStops];
      newLineIds = LineId;
    }

    setSelectedServices((prevState) => {
      return {
        ...prevState,
        TramLines: newTramLines,
        LineId: newLineIds,
      };
    });

    closeAutoComplete();
  };

  // Helper booleans
  const bothStopsSelected = tramStops.From?.name && tramStops.To?.name;
  const isFullLineSelected = selectedLines.length > 0;
  const hasAnySelectedStops =
    selectedServices.TramLines.length > 0 || tramStops.From !== null || tramStops.To !== null;

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1 wmnds-m-b-xl">
        <h4>Select tram stops between</h4>
        <TramAutoCompleteInput tramStop={tramStops.From} setTramStop={setTramStopFrom} />
        <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
        <TramAutoCompleteInput tramStop={tramStops.To} setTramStop={setTramStopTo} />
        {/* Select full line instead */}
        <h4 className="wmnds-m-t-lg">Or select entire tram line</h4>
        <TramAutoCompleteSelectLine
          selectedLines={selectedServices.LineId}
          setSelectedLines={setSelectedTramLines}
        />
        {/* Warning message for when selecting the whole line */}
        {isFullLineSelected && hasAnySelectedStops && (
          <div className="wmnds-grid">
            <div className="wmnds-col-md-7-8">
              <WarningText
                type="warning"
                message="Selecting the entire tram line will remove your current stop-by-stop alerts"
                className="wmnds-p-r-sm"
              />
            </div>
          </div>
        )}
      </div>
      {bothStopsSelected || isFullLineSelected ? (
        <Button className="wmnds-btn" text="Continue" onClick={selectTramOptions} />
      ) : (
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <Button
            className="wmnds-btn wmnds-btn--primary"
            text="Cancel"
            onClick={closeAutoComplete}
          />
        </div>
      )}
    </div>
  );
};

TramAutoComplete.propTypes = {
  selectedServices: PropTypes.shape({
    TramLines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  closeAutoComplete: PropTypes.func.isRequired,
};

export default TramAutoComplete;