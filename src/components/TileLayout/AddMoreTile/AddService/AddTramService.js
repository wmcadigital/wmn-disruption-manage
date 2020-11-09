import React from 'react';
import PropTypes from 'prop-types';
// Custom Hooks
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddTramService = ({ trams, setSelectedServices }) => {
  /* Check the services that are already assigned */
  const { tramServices } = useFilterSubscribedServices();

  const handleRemoveTram = (lineId) => {
    setSelectedServices((prevState) => prevState.filter((item) => item.lineId !== lineId));
  };

  return (
    <>
      {/* Add tram service button */}
      {trams && trams.length === 0 && tramServices && tramServices.length === 0 && (
        <div>
          <Button
            className="wmnds-btn--primary wmnds-col-auto wmnds-m-b-sm"
            text="Add tram service"
            onClick={() => {
              setSelectedServices((prevState) => [
                ...prevState,
                {
                  lineId: '4546',
                  routeName: 'Birmingham - Wolverhampton - Birmingham',
                  serviceNumber: 'mm1',
                },
              ]);
            }}
            iconRight="general-expand"
          />
        </div>
      )}

      {/* Add chosen tram services */}
      {trams && trams.length > 0 && (
        <div className="wmnds-m-t-md">
          <h4>Trams you want to add</h4>
          {trams.map((tramRoute) => {
            return (
              <RemoveService
                showRemove
                mode="tram"
                id={tramRoute.lineId}
                onClick={() => handleRemoveTram(tramRoute.lineId)}
                serviceNumber={tramRoute.serviceNumber}
                routeName={tramRoute.routeName}
                key={`${tramRoute.lineId}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

AddTramService.propTypes = {
  trams: PropTypes.arrayOf(
    PropTypes.shape({
      lineId: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      serviceNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddTramService;
