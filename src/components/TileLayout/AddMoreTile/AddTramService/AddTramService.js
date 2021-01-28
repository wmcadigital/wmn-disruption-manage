import React from 'react';
import PropTypes from 'prop-types';
// Custom Hooks
// import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddTramService = ({ setMode, selectedServices, setSelectedServices }) => {
  /* Check the services that are already assigned */
  const { TramLines } = selectedServices;

  const handleRemoveTram = ({ From, To }) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        TramLines: prevState.TramLines.filter(
          (tram) => tram.From.id !== From.id || tram.To.id !== To.id
        ),
      };
    });
  };

  const handleAddTram = () => {
    setMode('tram');
  };

  return (
    <>
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      <Button
        className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        text={`Add ${TramLines && TramLines.length > 0 ? 'another' : ''} train service`}
        onClick={handleAddTram}
        iconRight="general-expand"
      />

      {/* Add chosen tram services */}
      {TramLines && TramLines.length > 0 && (
        <>
          <h4>Trams you want to add</h4>
          {TramLines.map((route) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveTram(route)}
                serviceNumber="MM1"
                mode="tram"
                routeName={`${route.From.name} to ${route.To.name}`}
                id={`${route.From.id}-${route.To.id}`}
                key={`${route.From.id}-${route.To.id}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};

AddTramService.propTypes = {
  setMode: PropTypes.func.isRequired,
  selectedServices: PropTypes.shape({
    TramLines: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        From: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddTramService;
