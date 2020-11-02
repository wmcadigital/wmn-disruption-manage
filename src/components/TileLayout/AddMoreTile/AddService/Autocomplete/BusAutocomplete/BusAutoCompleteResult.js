import React from 'react';
// import { FormDataContext } from 'globalState/FormDataContext';

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown, setSelectedServices, setMode } = props || {};
  const updateSelectedService = (lineId, routeName, serviceNumber) => {
    setSelectedServices((prevState) => [...prevState, { lineId, routeName, serviceNumber }]);
    setMode(null);
  };

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid wmnds-grid--align-center"
      title={result.serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() =>
        updateSelectedService(result.id, result.routes[0].routeName, result.serviceNumber)
      }
    >
      <div className="wmnds-col-auto">
        <div
          className="
          wmnds-disruption-indicator-medium
          wmnds-col-auto 
          "
        >
          {result.serviceNumber}
        </div>
      </div>
      <div className="wmnds-col-3-4 wmnds-col-lg-4-5">
        <strong>{result.routes[0].routeName}</strong>
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
