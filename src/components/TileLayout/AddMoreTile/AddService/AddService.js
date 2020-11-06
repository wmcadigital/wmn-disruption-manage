import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
import Button from 'components/shared/Button/Button';
import Bus from 'components/shared/Bus/Bus';
import AutoComplete from './Autocomplete/Autocomplete';

const AddService = ({ isFetching, selectedServices, setSelectedServices, addRoutes }) => {
  /* Check the services that are already assigned */
  const { tramServices } = useFilterSubscribedServices();

  const [mode, setMode] = useState(null);
  let trams = [];
  let buses = [];
  if (selectedServices && selectedServices.length > 0) {
    buses = selectedServices.filter((service) => service.lineId !== '4546');
    trams = selectedServices.filter((service) => service.lineId === '4546');
  }

  const handleRemoveBus = (lineId) => {
    setSelectedServices((prevState) => prevState.filter((item) => item.lineId !== lineId));
  };

  return (
    <>
      <p>We'll send an automatic disruption alert for each service you add.</p>

      <h2>Buses</h2>
      {/* Show bus autocomplete if we want to add more bus services */}
      {mode === 'bus' && (
        <>
          <AutoComplete mode="bus" setSelectedServices={setSelectedServices} setMode={setMode} />
        </>
      )}

      {/* Add bus service button */}
      {mode !== 'bus' && (
        <div>
          <Button
            className="wmnds-btn--primary wmnds-col-auto wmnds-m-b-sm"
            text="Add bus service"
            onClick={() => setMode('bus')}
            iconRight="general-expand"
          />
        </div>
      )}

      {/* Add choosen bus services */}
      {mode !== 'bus' && buses && buses.length > 0 && (
        <div className="wmnds-m-t-md">
          <h4>Bus services that you want to add</h4>
          {buses.map((busRoute) => {
            return (
              <Bus
                lineId={busRoute.lineId}
                handleRemove={() => handleRemoveBus(busRoute.lineId)}
                serviceNumber={busRoute.serviceNumber}
                routeName={busRoute.routeName}
                id={busRoute.lineId}
                key={`${busRoute.lineId}`}
              />
            );
          })}
        </div>
      )}
      <br />
      <h2>Trams</h2>
      {/* Add tram service button */}
      {mode !== 'bus' && trams.length === 0 && tramServices.length === 0 && (
        <div>
          <Button
            className="wmnds-btn--primary wmnds-col-auto wmnds-m-b-sm"
            text="Add tram service"
            onClick={() => {
              setMode('tram');
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

      {/* Add choosen tram services */}
      {mode !== 'bus' && trams && trams.length > 0 && (
        <div className="wmnds-m-t-md">
          <h4>Tram services you want to add</h4>
          {trams.map((tramRoute) => {
            return (
              <Bus
                lineId={tramRoute.lineId}
                handleRemove={() => handleRemoveBus(tramRoute.lineId)}
                serviceNumber={tramRoute.serviceNumber}
                routeName={tramRoute.routeName}
                id={tramRoute.lineId}
                key={`${tramRoute.lineId}`}
              />
            );
          })}
        </div>
      )}

      {/* Add more services buttons */}
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
