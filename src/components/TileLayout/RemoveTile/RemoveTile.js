import React from 'react';

// Components
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
import useSelectableTramLines from 'customHooks/useSelectableTramLines';
import RemoveAPIService from '../../shared/RemoveService/RemoveAPIService';

const RemoveTile = () => {
  const { busServices, tramServices, trainServices, allServices } = useFilterSubscribedServices();
  const { filterTramLineInfo } = useSelectableTramLines();
  const selectedTramLines = filterTramLineInfo(allServices.map((service) => service.id));

  let buses;
  if (busServices && busServices.length > 0) {
    buses = (
      <>
        <h3>Bus services</h3>
        <div className={`${tramServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
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
        <div className="wmnds-m-b-xl">
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

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Remove your services</h2>
      <p>Remove services you no longer want alerts for.</p>
      <hr className="wmnds-m-t-md wmnds-m-b-md" />
      {/* If we have bus or tram services then map through them */}
      {buses || trams || trains ? (
        <>
          {buses}
          {trams}
          {trains}
        </>
      ) : (
        <span>You are not subscribed to any services</span>
      )}
    </div>
  );
};

export default RemoveTile;
