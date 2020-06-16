import React, { useState } from 'react';
// Custom hooks
import useFetchAddServices from 'customHooks/useFetchAddServices';
// Components

import AddService from './AddService/AddService';

const AddMoreTile = () => {
  const [selectedBuses, setSelectedBuses] = useState([]);
  const { addRoutes, isFetching, isFetchSuccessful } = useFetchAddServices(selectedBuses);

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>
      {!isFetchSuccessful && (
        <AddService
          isFetching={isFetching}
          selectedBuses={selectedBuses}
          setSelectedBuses={setSelectedBuses}
          addRoutes={addRoutes}
        />
      )}

      {isFetchSuccessful && (
        <p>We have sent you an email asking you to confirm your subscription.</p>
      )}

      {isFetchSuccessful === false && (
        <p>Apologies, we are having technical difficulties. Try again later.</p>
      )}
    </div>
  );
};

export default AddMoreTile;
