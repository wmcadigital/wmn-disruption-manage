import React from 'react';
import PropTypes from 'prop-types';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';

const AutoComplete = ({ mode, setMode, setSelectedServices }) => {
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
        {autoCompleteTitle(`Search for a ${mode} service`)}
        <BusAutoComplete mode={mode} setMode={setMode} setSelectedServices={setSelectedServices} />
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

AutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AutoComplete;
