import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import AddBusService from './AddBusService';
import AddTramService from './AddTramService';
// import AddTrainService from './AddTrainService';
import AutoComplete from './Autocomplete/Autocomplete';

const AddService = ({ selectedServices, setSelectedServices }) => {
  const [mode, setMode] = useState(null);

  // if (selectedServices && selectedServices.length > 0) {
  //   buses = selectedServices.filter((service) => service.lineId !== '4546');
  //   trams = selectedServices.filter((service) => service.lineId === '4546');
  // }

  return (
    <>
      <p>We&apos;ll send an automatic disruption alert for each service you add.</p>
      {/* Searching for a service to add */}
      {mode ? (
        <AutoComplete mode={mode} setSelectedServices={setSelectedServices} setMode={setMode} />
      ) : (
        <>
          {/* Show buttons and chosen services to be added */}
          <AddBusService
            setMode={setMode}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          <AddTramService
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />

          {/* <AddTrainService setMode={setMode} /> */}
        </>
      )}
    </>
  );
};

AddService.propTypes = {
  selectedServices: PropTypes.shape({
    BusServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.string),
    Trains: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.string.isRequired,
        From: PropTypes.string.isRequired,
        LineIds: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }).isRequired,

  setSelectedServices: PropTypes.func.isRequired,
};

export default AddService;
