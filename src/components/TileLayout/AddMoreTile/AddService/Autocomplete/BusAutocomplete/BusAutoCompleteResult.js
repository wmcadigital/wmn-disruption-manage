import React from 'react';
// import { FormDataContext } from 'globalState/FormDataContext';
import style from './../ServiceAutocomplete.module.scss';

const BusAutoCompleteResult = props => {
  const { result, handleKeyDown, setSelectedServices, setMode, existing } = props || {};
  const updateSelectedService = (lineId, routeName, serviceNumber) => {
    setSelectedServices(prevState => [...prevState, { lineId, routeName, serviceNumber }]);
    setMode(null);
  };

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className={`wmnds-autocomplete-suggestions__li wmnds-grid ${
        existing ? style.wmnds_autocomplete_suggestions__li_disabled : ''
      }`}
      title={result.serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={e => handleKeyDown(e)}
      onClick={() => updateSelectedService(result.id, result.routes[0].routeName, result.serviceNumber)}
    >
      {/* Right section */}
      <div
        className="
        wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md
        "
      >
        {result.serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{result.routes[0].routeName}</strong>
    </li>
  );
};

export default BusAutoCompleteResult;
