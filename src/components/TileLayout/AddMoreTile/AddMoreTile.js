import React, { useState } from 'react';
// Components
import Bus from 'components/shared/Bus/Bus';
import Button from 'components/shared/Button/Button';
import AutoComplete from './Autocomplete/Autocomplete';

const AddMoreTile = () => {
  const [addMore, setAddMore] = useState(false);
  const [bus, setBus] = useState([]);

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>
      <p>You can add as many services as you would like.</p>

      {!addMore && <Button text="Add more services" onClick={() => setAddMore(true)} />}

      {addMore && (
        <>
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

          <Button
            className="wmnds-btn--secondary wmnds-m-t-md"
            text="Cancel"
            onClick={() => setAddMore(false)}
          />
        </>
      )}
    </div>
  );
};

export default AddMoreTile;
