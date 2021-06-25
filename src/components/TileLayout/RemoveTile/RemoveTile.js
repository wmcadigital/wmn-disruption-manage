import React from 'react';

// Components
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
import useSelectableTramLines from 'customHooks/useSelectableTramLines';
import RemoveAPIService from '../../shared/RemoveService/RemoveAPIService';

const RemoveTile = () => {
  const subscribedServices = useFilterSubscribedServices();
  const { allServices } = subscribedServices;
  const { filterTramLineInfo } = useSelectableTramLines();
  const selectedTramLines = filterTramLineInfo(allServices.map((service) => service.id));

  let buses;
  const { busServices, tramServices } = subscribedServices;
  if (busServices && busServices.length > 0) {
    buses = (
      <>
        <h3>Bus services</h3>
        <div
          className={`${
            tramServices.length > 0 || selectedTramLines.length > 0
              ? 'wmnds-m-b-sm'
              : 'wmnds-m-b-xl'
          }`}
        >
          {busServices &&
            busServices.reverse().map((serviceRoute) => {
              return (
                <RemoveAPIService
                  showRemove
                  mode="bus"
                  data={{ id: serviceRoute.id }}
                  serviceNumber={serviceRoute.name}
                  routeName={serviceRoute.idName}
                  key={serviceRoute.id}
                />
              );
            })}
        </div>
      </>
    );
  }

  let trams;
  if ((tramServices && tramServices.length > 0) || selectedTramLines.length > 0) {
    trams = (
      <>
        <h3>Tram services</h3>
        <div className={`${tramServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {tramServices &&
            tramServices.map((serviceRoute) => {
              return (
                <RemoveAPIService
                  showRemove
                  mode="tram"
                  serviceNumber="MM1"
                  routeName={`${serviceRoute.from} to ${serviceRoute.to}`}
                  data={{ id: serviceRoute.id, from: serviceRoute.from, to: serviceRoute.to }}
                  key={`${serviceRoute.from}-${serviceRoute.to}`}
                />
              );
            })}
          {selectedTramLines.length > 0 &&
            selectedTramLines.map((line) => {
              return (
                <RemoveAPIService
                  showRemove
                  mode="tram"
                  data={{ id: line.id, tramLine: true }}
                  serviceNumber={line.serviceNumber}
                  routeName={line.routeName}
                  key={line.routeName}
                />
              );
            })}
        </div>
      </>
    );
  }

  let trains;
  const { trainServices } = subscribedServices;
  if (trainServices && trainServices.length > 0) {
    trains = (
      <>
        <h3>Train lines</h3>
        <div className={`${trainServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {trainServices.map((line) => {
            return (
              <RemoveAPIService
                showRemove
                serviceNumber={line}
                data={{ id: line }}
                key={line}
                mode="train"
              />
            );
          })}
        </div>
      </>
    );
  }

  let roads;
  const { roadAreas } = subscribedServices;
  if (roadAreas && roadAreas.length > 0) {
    roads = (
      <>
        <h3>Roads</h3>
        <div className={`${roadAreas.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {roadAreas.map((area) => {
            return (
              <RemoveAPIService
                showRemove
                data={{ id: area.id, lat: area.lat, lon: area.lon }}
                key={`${area.lat}${area.lon}`}
                routeName={`${area.address} + ${area.radius} mile${area.radius > 1 ? 's' : ''}`}
                mode="road"
              />
            );
          })}
        </div>
      </>
    );
  }

  const isUserSubscribedToAnyServices = buses || trams || trains || roads;

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Remove your services</h2>
      <p>Remove services you no longer want alerts for.</p>
      <hr className="wmnds-m-t-md wmnds-m-b-md" />
      {/* If we have bus or tram services then map through them */}
      {isUserSubscribedToAnyServices ? (
        <>
          {buses}
          {trams}
          {trains}
          {roads}
        </>
      ) : (
        <span>You are not subscribed to any services</span>
      )}
    </div>
  );
};

export default RemoveTile;
