import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from 'components/shared/Button/Button';
import BusSummary from './BusSummary/BusSummary';
import AutoComplete from './Autocomplete/Autocomplete';

const AddService = ({ isFetching, selectedServices, setSelectedServices, addRoutes }) => {
  const [mode, setMode] = useState(null);
  let trams = [];
  let buses = [];
  if (selectedServices && selectedServices.length > 0) {
    buses = selectedServices.filter(service => service.lineId !== '4546');
    trams = selectedServices.filter(service => service.lineId === '4546');
  }

  return (
    <>
      <p>You can add as many services as you would like.</p>

      {/* Show bus autocomplete if we want to add more bus services */}
      {mode === 'bus' && (
        <>
          <AutoComplete mode="bus" setSelectedServices={setSelectedServices} setMode={setMode} />
          <Button className="wmnds-btn--secondary wmnds-m-t-md" text="Cancel" onClick={() => setMode(null)} />
        </>
      )}

      {/* If bus array exists then we have some services, so show them when autocomplete isn't visible */}
      {selectedServices && selectedServices.length > 0 && (
        <>
          <div className={` ${selectedServices.length ? 'wmnds-m-t-md' : ''}`}>
            {buses.length > 0 && <h4>Buses you want to add</h4>}
            {buses.map(busRoute => {
              return (
                <BusSummary
                  showRemove
                  lineId={busRoute.lineId}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  setSelectedServices={setSelectedServices}
                  key={busRoute.lineId}
                />
              );
            })}

            {trams.length > 0 && <h4>Trams you want to add</h4>}
            {trams.length > 0 &&
              trams.map(tramRoute => {
                return (
                  <BusSummary
                    showRemove
                    lineId={tramRoute.lineId}
                    serviceNumber={tramRoute.serviceNumber}
                    routeName={tramRoute.routeName}
                    setSelectedServices={setSelectedServices}
                    key={tramRoute.lineId}
                  />
                );
              })}
          </div>
        </>
      )}

      {/* Add more services buttons */}
      <Button
        className="wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-3"
        text="Add bus service"
        onClick={() => setMode('bus')}
        iconRight="general-expand"
      />
      <Button
        className={`wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-3`}
        text="Add tram service"
        disabled={selectedServices && selectedServices.length > 0 && trams.length > 0}
        onClick={() => {
          setMode('tram');
          setSelectedServices(prevState => [
            ...prevState,
            { lineId: '4546', routeName: 'Birmingham to Wolverhampton', serviceNumber: 'mm1' }
          ]);
        }}
        iconRight="general-expand"
      />

      {/* Add button to confirm new subscriptions */}
      {selectedServices && selectedServices.length > 0 && (
        <div className="wmnds-col-1 wmnds-m-t-lg">
          <Button disabled={isFetching} isFetching={isFetching} text="Confirm new subscriptions" onClick={addRoutes} />
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
      serviceNumber: PropTypes.string.isRequired
    })
  ).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  addRoutes: PropTypes.func.isRequired
};

export default AddService;
