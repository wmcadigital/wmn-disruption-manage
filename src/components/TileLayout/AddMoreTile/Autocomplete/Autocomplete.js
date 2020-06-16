import React from 'react';
import PropTypes from 'prop-types';
// Import components
import BusAutoComplete from './BusAutoComplete';

const AutoComplete = ({ mode, setMode, setBus }) => {
  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    return (
      <div className="wmnds-grid">
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
