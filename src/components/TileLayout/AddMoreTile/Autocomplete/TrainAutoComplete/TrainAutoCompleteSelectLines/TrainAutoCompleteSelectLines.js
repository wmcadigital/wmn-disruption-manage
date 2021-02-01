/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
// Style
import s from './TrainAutoCompleteSelectLines.module.scss';

const TrainAutoCompleteSelectLines = ({
  closeAutoComplete,
  trainStations,
  selectedServices,
  setSelectedServices,
}) => {
  const lineIds = selectedServices?.Trains[0]?.LineIds || []; // Get the selected lines to what has already been selected or empty array
  const [selectedLines, setSelectedLines] = useState(lineIds); // Set state to lineIds var above
  const originalSelectedLines = lineIds; // This is used so we can store the original value and compare if the user changes anything (used to show continue/cancel button below)
  // These numbers will be used to convert .length into a written number
  const writtenNumbers = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
  ];

  const allLines = trainStations.From.lines.concat(trainStations.To.lines);
  // Then get any duplicates found and pluck them out. If duplicates are found then this means the user MUST be interested in only them lines as that line was part of their from AND to station search.
  const getDuplicates = allLines.filter((item, index) => allLines.indexOf(item) !== index);
  // If duplicates exist, use them as that's what the user is interested in. Otherwise default to all lines (all will be unique)...this usually means the user has selected two stations that are on separate lines.
  const linesToCompareWith = getDuplicates.length ? getDuplicates : allLines;

  // Run on change of select box
  const handleChange = (val) => {
    // If the selectedLine contains our line...
    if (selectedLines.includes(val)) {
      setSelectedLines((prev) => prev.filter((item) => item !== val)); // ...filter/remove it from the array
    } else {
      setSelectedLines((prev) => [...prev, val]); // Else, add it to the array
    }
  };

  // Run when continue button pressed
  const handleContinue = () => {
    let payload;
    // If Trains doesn't have any data yet
    if (!selectedServices.Trains.length) {
      // Set payload to from/to stations and the users selected lines
      payload = [
        {
          To: trainStations.To.name,
          From: trainStations.From.name,
          LineIds: selectedLines,
        },
      ];
    }
    // Else, if the above logic has already been completed when returning to this step && there are selectedLines to add
    else if (selectedLines.length) {
      const newArr = selectedServices.Trains; // Get existing data the user selected
      newArr[0].LineIds = selectedLines; // Map the selected lines to the first object in the array

      // Set payload to above newArr and and a new object. This will add the from/to as a new object but the selected lines will map to the first object in the array.
      payload = [
        ...newArr,
        { To: trainStations.To.name, From: trainStations.From.name, LineIds: [] },
      ];
    }
    // Else the user must have removed all their chosen lines, so reset trains field
    else {
      payload = [];
    }

    // Write new payload/data to global state
    setSelectedServices((prevState) => {
      return { ...prevState, Trains: payload };
    });

    // Go back to prev step
    closeAutoComplete();
  };

  return (
    <div className="wmnds-col-1">
      <h4>Select a train line</h4>
      <p>
        {writtenNumbers[linesToCompareWith.length]} train line
        {linesToCompareWith.length > 1 ? 's are' : ' is'} available between{' '}
        <strong>{trainStations.From.name}</strong> and <strong>{trainStations.To.name}</strong>{' '}
        train stations.
      </p>
      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset">
          {linesToCompareWith.map((line) => (
            <div key={line}>
              <label className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
                {/* Left side (service number and route name) */}
                <div
                  className={`wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto ${s.lineName}`}
                >
                  {line}
                </div>

                <div className="wmnds-fe-checkboxes__container wmnds-m-b-none">
                  {/* Right side for remove service button */}
                  <input
                    checked={selectedLines.includes(line)}
                    value={line}
                    onChange={(e) => handleChange(e.target.value)}
                    className="wmnds-fe-checkboxes__input"
                    type="checkbox"
                  />

                  <span className="wmnds-fe-checkboxes__checkmark">
                    <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
                  </span>
                </div>
              </label>
              <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
            </div>
          ))}
        </fieldset>
      </div>
      {/* This logic compares if the users selected lines are different from the ones they originally chose (when step loads). If it's different then the user must have changed their chosen lines, so show continue button else show cancel button(nothing changed) */}
      {originalSelectedLines.sort().join(',') !== selectedLines.sort().join(',') ? (
        <Button text="Continue" onClick={handleContinue} />
      ) : (
        // Add cancel button
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <Button className="wmnds-btn--primary" text="Cancel" onClick={closeAutoComplete} />
        </div>
      )}
    </div>
  );
};

TrainAutoCompleteSelectLines.propTypes = {
  closeAutoComplete: PropTypes.func.isRequired,
  trainStations: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedServices: PropTypes.shape({
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

export default TrainAutoCompleteSelectLines;
