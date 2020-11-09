import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from 'components/shared/Button/Button';
import AddBusService from './AddBusService';
import AddTramService from './AddTramService';
// import AddTrainService from './AddTrainService';
import AutoComplete from './Autocomplete/Autocomplete';

const AddService = ({ isFetching, selectedServices, setSelectedServices, addRoutes }) => {
  const [mode, setMode] = useState(null);
  let buses = [];
  let trams = [];
  if (selectedServices && selectedServices.length > 0) {
    buses = selectedServices.filter((service) => service.lineId !== '4546');
    trams = selectedServices.filter((service) => service.lineId === '4546');
  }

  return (
    <>
      <p>We&apos;ll send an automatic disruption alert for each service you add.</p>
      {/* Searching for a service to add */}
      {mode !== null && (
        <>
          <AutoComplete mode={mode} setSelectedServices={setSelectedServices} setMode={setMode} />
        </>
      )}
      {/* Show buttons and chosen services to be added */}
      {mode === null && (
        <>
          <AddBusService setMode={setMode} buses={buses} />

          <AddTramService trams={trams} setSelectedServices={setSelectedServices} />

          {/* <AddTrainService setMode={setMode} /> */}

          {/* Confirm service new subscriptions */}
          {mode !== 'bus' && selectedServices && selectedServices.length > 0 && (
            <div className="wmnds-col-1 wmnds-m-t-lg">
              {/* Add button to confirm new subscriptions */}
              <Button
                className="wmnds-col-1 wmnds-col-md-1-2"
                disabled={isFetching}
                isFetching={isFetching}
                text="Confirm new subscriptions"
                onClick={addRoutes}
                iconRight="general-chevron-right"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

AddService.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  selectedServices: PropTypes.arrayOf(
    PropTypes.shape({
      lineId: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      serviceNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  addRoutes: PropTypes.func.isRequired,
};

export default AddService;
