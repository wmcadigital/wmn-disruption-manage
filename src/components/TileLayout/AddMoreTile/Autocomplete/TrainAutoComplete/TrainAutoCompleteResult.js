import React from 'react';

const TrainAutoCompleteResult = (props) => {
  const { result, handleKeyDown, setTrainStations, to } = props || {};
  // Destructure fields from result
  const { id, name, lines } = result;

  // Function to update the state with selected service
  const updateSelectedService = () => {
    const toOrFrom = to ? 'To' : 'From';

    setTrainStations((prevState) => ({
      ...prevState,
      [toOrFrom]: { id, name, lines },
    }));

    // handleCancel(); // Passed in from parent (go back to previous step and set mode to null)
  };

  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={name}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <strong className="wmnds-col-1">{name}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
