import React from 'react';
import PropTypes from 'prop-types';
// Custom Hooks
// import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddTramService = ({ selectedServices, setSelectedServices }) => {
  /* Check the services that are already assigned */
  const { TramServices } = selectedServices;

  const handleRemoveTram = (id) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        TramServices: prevState.TramServices.filter((tram) => id !== tram.id),
        LineId: prevState.LineId.filter((tramId) => +id !== tramId),
      };
    });
  };

  const handleAddTram = () => {
    const defTram = [
      {
        id: '4546',
        routeName: 'Birmingham - Wolverhampton - Birmingham',
        serviceNumber: 'MM1',
      },
    ];

    setSelectedServices((prevState) => {
      return { ...prevState, LineId: [...prevState.LineId, 4546], TramServices: defTram };
    });
  };

  return (
    <div className="wmnds-m-t-md">
      {/* Add tram service button */}
      {(!TramServices || TramServices.length === 0) && (
        <Button
          className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
          onClick={handleAddTram}
          text="Add tram service"
          iconRight="general-expand"
        />
      )}

      {/* Add chosen tram services */}
      {TramServices && TramServices.length > 0 && (
        <>
          <h4>Trams you want to add</h4>
          {TramServices.map((tramRoute) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveTram(tramRoute.id)}
                serviceNumber={tramRoute.serviceNumber}
                mode="tram"
                routeName={tramRoute.routeName}
                id={tramRoute.id}
                key={`${tramRoute.id}`}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

AddTramService.propTypes = {
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

export default AddTramService;
