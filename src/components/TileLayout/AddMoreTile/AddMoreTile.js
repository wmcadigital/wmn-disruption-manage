import React, { useState } from 'react';
// Components
import Bus from 'components/shared/Bus/Bus';
import Button from 'components/shared/Button/Button';
import AutoComplete from './Autocomplete/Autocomplete';

const AddMoreTile = () => {
  const [mode, setMode] = useState(null);
  const [bus, setBus] = useState([]);

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>
      <p>You can add as many services as you would like.</p>

      {/* Add more services button */}
      {!mode && (
        <Button
          className="wmnds-btn--primary"
          text="Add more services"
          onClick={() => setMode('bus')}
        />
      )}

      {/* Show autocomplete if we want to add more services */}
      {mode && (
        <>
          <AutoComplete mode="bus" setBus={setBus} setMode={setMode} />
          <Button
            className="wmnds-btn--secondary wmnds-m-t-md"
            text="Cancel"
            onClick={() => setMode(null)}
          />
        </>
      )}

      {/* If bus array exists then we have some services, so show them when autocomplete isn't visible */}
      {bus && !mode && (
        <>
          <div className={` ${bus.length ? 'wmnds-m-t-md' : ''}`}>
            {bus.length > 0 && <h4>Services you want to add</h4>}
            {bus.map((busRoute) => {
              return (
                <Bus
                  showRemove
                  // handleRemove={handleRemove}
                  lineId={busRoute.serviceId}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  key={busRoute.serviceId}
                />
              );
            })}
          </div>
          {bus.length > 0 && <Button text="Confirm new subscriptions" />}
        </>
      )}
    </div>
  );
};

export default AddMoreTile;
