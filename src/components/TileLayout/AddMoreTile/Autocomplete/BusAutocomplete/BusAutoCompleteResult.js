import React from 'react';
// import { FormDataContext } from 'globalState/FormDataContext';

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown, setSelectedServices, handleCancel } = props || {};
  // Destructure fields from result
  const { routeName } = result.routes[0];
  const { serviceNumber, id } = result;

  const updateSelectedService = () => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        LineId: [...prevState.LineId, id],
        BusServices: [...prevState.BusServices, { id, routeName, serviceNumber }],
      };
    });

    handleCancel();
  };

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid wmnds-grid--align-center"
      title={serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <div className="wmnds-col-auto">
        <div
          className="
          wmnds-disruption-indicator-medium
          wmnds-col-auto
          "
        >
          {serviceNumber}
        </div>
      </div>
      <div className="wmnds-col-3-4 wmnds-col-lg-4-5">
        <strong>{routeName}</strong>
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
