import React, { useState } from 'react';
import Bus from 'components/shared/Bus/Bus';
import AutoComplete from './Autocomplete/Autocomplete';

const AddMoreTile = () => {
  const [bus, setBus] = useState([]);

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
      <AutoComplete mode="bus" setBus={setBus} />

      <div className={` ${bus.length ? 'wmnds-m-b-xl' : ''}`}>
        {bus &&
          bus.map((busRoute) => {
            return (
              <Bus
                showRemove
                // handleRemove={handleRemove}
                serviceNumber={busRoute.serviceNumber}
                routeName={busRoute.routeName}
                key={`${busRoute.serviceNumber}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AddMoreTile;
