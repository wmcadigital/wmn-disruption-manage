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

      {!mode && <Button text="Add more services" onClick={() => setMode('bus')} />}

      {mode && (
        <>
          <AutoComplete mode="bus" setBus={setBus} setMode={setMode} />

          <div className={` ${bus.length ? 'wmnds-m-b-xl' : ''}`}>
            {bus &&
              bus.map((busRoute) => {
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

          <Button
            className="wmnds-btn--secondary wmnds-m-t-md"
            text="Cancel"
            onClick={() => setMode(null)}
          />
        </>
      )}
    </div>
  );
};

export default AddMoreTile;
