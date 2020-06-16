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
      <AddService
        isFetching={isFetching}
        selectedBuses={selectedBuses}
        setSelectedBuses={setSelectedBuses}
        addRoutes={addRoutes}
      />
    </div>
  );
};

export default AddMoreTile;
