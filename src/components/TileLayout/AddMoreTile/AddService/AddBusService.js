import React from 'react';
import PropTypes from 'prop-types';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddBusService = ({ setMode, buses, setSelectedServices }) => {
  const handleRemoveBus = (lineId) => {
    setSelectedServices((prevState) => prevState.filter((item) => item.lineId !== lineId));
  };

  return (
    <>
      <div>
        <Button
          className="wmnds-btn--primary wmnds-col-auto wmnds-m-b-sm"
          text="Add bus service"
          onClick={() => {
            setMode('bus');
          }}
          iconRight="general-expand"
        />
      </div>

      {/* Add choosen bus services */}
      {buses && buses.length > 0 && (
        <div className="wmnds-m-t-md">
          <h4>Bus services that you want to add</h4>
          {buses.map((busRoute) => {
            return (
              <RemoveService
                showRemove
                mode="bus"
                id={busRoute.lineId}
                serviceNumber={busRoute.serviceNumber}
                routeName={busRoute.routeName}
                key={busRoute.lineId}
                onClick={() => handleRemoveBus(busRoute.lineId)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

AddBusService.propTypes = {
  setMode: PropTypes.func.isRequired, // Set custom button classes, will default to wmnds-btn (primary btn)
  buses: PropTypes.arrayOf(
    PropTypes.shape({
      lineId: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      serviceNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddBusService;
