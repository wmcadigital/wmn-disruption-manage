import React from 'react';
import AutoComplete from './Autocomplete/Autocomplete';

const AddMoreTile = () => {
  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>
      <p>You can add as many services as you would like.</p>
      <a
        href={process.env.REACT_APP_DISRUPTION_SIGN_UP_URL}
        title="Add more service services"
        target="_self"
        className="wmnds-btn"
      >
        Add more services
      </a>
      <AutoComplete mode="bus" />
    </div>
  );
};

export default AddMoreTile;
