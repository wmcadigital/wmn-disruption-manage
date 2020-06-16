import React from 'react';
import PropTypes from 'prop-types';
// Import components
import BusAutoComplete from './BusAutoComplete';

const AutoComplete = ({ mode, setMode, setBus }) => {
  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
        </div>
      );
    };

    return (
      <div className="wmnds-grid">
        {autoCompleteTitle(`Search for a ${mode} service`)}
        <BusAutoComplete mode={mode} setMode={setMode} setBus={setBus} />
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

AutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  setBus: PropTypes.func.isRequired,
};

export default AutoComplete;
