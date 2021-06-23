import React from 'react';

const RoadAutoCompleteResult = (props) => {
  const { result, handleKeyDown, setRoadArea } = props || {};
  // Destructure fields from result
  const { address, location } = result;

  // Function to update the state with selected service
  const updateSelectedService = () => {
    setRoadArea({
      address,
      location,
    });
  };

  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid wmnds-grid--align-center"
      title={address}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <div className="wmnds-col-3-4 wmnds-col-lg-4-5">
        <strong>{address}</strong>
      </div>
    </li>
  );
};

export default RoadAutoCompleteResult;
