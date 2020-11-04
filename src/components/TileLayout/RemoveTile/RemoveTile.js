import React from 'react';

// Components
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
import RemoveService from '../../shared/RemoveService/RemoveService';

const RemoveTile = () => {
  const { allServices, busServices, tramServices, trainServices } = useFilterSubscribedServices();

  let buses;
  if (busServices && busServices.length > 0) {
    buses = (
      <>
        <h3>Bus services</h3>
        <div className={`${tramServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {busServices &&
            busServices.reverse().map((serviceRoute) => {
              return (
                <RemoveService
                  showRemove
                  mode="bus"
                  id={serviceRoute.id}
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
  if (tramServices && tramServices.length > 0) {
    trams = (
      <>
        <h3>Tram services</h3>
        <div className="wmnds-m-b-xl">
          {tramServices &&
            tramServices.map((serviceRoute) => {
              return (
                <RemoveService
                  showRemove
                  mode="tram"
                  id={serviceRoute.id}
                  serviceNumber={serviceRoute.name}
                  routeName="Birmingham - Wolverhampton - Birmingham"
                  key={serviceRoute.id}
                />
              );
            })}
        </div>
      </>
    );
  }

  /* const handleRemoveTrain = (id) => {
    // If there is just one line left, then we reset the trains object as there is nothing else to remove so we may as well get rid of all train state (all stations user has built up)
    if (formDataState.formData.Trains[0].LineIds.length === 1) {
      formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: { Trains: [] } });
    }
    // Else, remove individual train line
    else {
      formDataDispatch({ type: 'REMOVE_TRAIN', payload: id });
    }
  }; */

  let trains;
  console.log(trainServices);
  if (trainServices && trainServices.length > 0) {
    trains = (
      <>
        <h3>Train lines</h3>
        <div className={`${trainServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {trainServices[0].LineIds.map((line) => {
            return (
              <RemoveService
                showRemove
                // onClick={() => handleRemoveTrain(line)}
                serviceNumber={line}
                id={line}
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
      {allServices && allServices.length > 0 ? (
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
