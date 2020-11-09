import React from 'react';
import PropTypes from 'prop-types';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddBusService = ({ setMode, selectedServices, setSelectedServices }) => {
  const { BusServices } = selectedServices;

  const handleRemoveBus = (id) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        BusServices: prevState.BusServices.filter((bus) => id !== bus.id),
        LineId: prevState.LineId.filter((busId) => id !== busId),
      };
    });
  };

  const handleAddBus = () => setMode('bus');

  return (
    <div className="wmnds-m-t-md">
      <Button
        className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        text={`Add ${BusServices && BusServices.length > 0 ? 'another' : ''} bus service`}
        onClick={handleAddBus}
        iconRight="general-expand"
      />

      {/* Add chosen bus services */}
      {BusServices && BusServices.length > 0 && (
        <>
          <h4>Bus services that you want to add</h4>
          {BusServices.map((busRoute) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveBus(busRoute.id)}
                mode="bus"
                serviceNumber={busRoute.serviceNumber}
                routeName={busRoute.routeName}
                id={busRoute.id}
                key={busRoute.id}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

AddBusService.propTypes = {
  setMode: PropTypes.func.isRequired, // Set custom button classes, will default to wmnds-btn (primary btn)
  selectedServices: PropTypes.shape({
    TramServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    BusServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    Trains: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.string.isRequired,
        From: PropTypes.string.isRequired,
        LineIds: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddBusService;
