import React, { useState } from 'react';
// Components
import Button from 'components/shared/Button/Button';
import BusSummary from './BusSummary/BusSummary';
import AutoComplete from './Autocomplete/Autocomplete';

const AddMoreTile = () => {
  const [mode, setMode] = useState(null);
  const [selectedBuses, setSelectedBuses] = useState([]);

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
          <AutoComplete mode="bus" setSelectedBuses={setSelectedBuses} setMode={setMode} />
          <Button
            className="wmnds-btn--secondary wmnds-m-t-md"
            text="Cancel"
            onClick={() => setMode(null)}
          />
        </>
      )}

      {/* If bus array exists then we have some services, so show them when autocomplete isn't visible */}
      {selectedBuses && !mode && (
        <>
          <div className={` ${selectedBuses.length ? 'wmnds-m-t-md' : ''}`}>
            {selectedBuses.length > 0 && <h4>Services you want to add</h4>}
            {selectedBuses.map((busRoute) => {
              return (
                <BusSummary
                  showRemove
                  lineId={busRoute.lineId}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  setSelectedBuses={setSelectedBuses}
                  key={busRoute.serviceId}
                />
              );
            })}
          </div>
          {selectedBuses.length > 0 && <Button text="Confirm new subscriptions" />}
        </>
      )}
    </div>
  );
};

export default AddMoreTile;
