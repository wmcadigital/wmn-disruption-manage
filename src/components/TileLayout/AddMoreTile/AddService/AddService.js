import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from 'components/shared/Button/Button';
import BusSummary from './BusSummary/BusSummary';
import AutoComplete from './Autocomplete/Autocomplete';

const AddService = ({ isFetching, selectedBuses, setSelectedBuses, addRoutes }) => {
  const [mode, setMode] = useState(null);

  return (
    <>
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
                  key={busRoute.lineId}
                />
              );
            })}
          </div>
          {selectedBuses.length > 0 && (
            <Button
              disabled={isFetching}
              isFetching={isFetching}
              text="Confirm new subscriptions"
              onClick={addRoutes}
            />
          )}
        </>
      )}
    </>
  );
};

AddService.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  selectedBuses: PropTypes.arrayOf(
    PropTypes.shape({
      lineId: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      serviceNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedBuses: PropTypes.func.isRequired,
  addRoutes: PropTypes.func.isRequired,
};

export default AddService;
