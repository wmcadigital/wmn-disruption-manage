import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Bus from './Bus/Bus';
//import Tram from './Tram/Tram';

const RemoveTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const allServices = subscriberState.user.lineId;
  const busServices = allServices.filter(service => service.id !== '4546');
  const tramServices = allServices.filter(service => service.id === '4546');

  let buses;
  if (busServices && busServices.length > 0) {
    buses = (
      <>
        <h3>Bus services added</h3>
        <div className={`${tramServices.length > 0 ? 'wmnds-m-b-sm' : 'wmnds-m-b-xl'}`}>
          {busServices &&
            busServices.map(serviceRoute => {
              return (
                <Bus
                  lineId={serviceRoute.id}
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
        <h3>Tram services added</h3>
        <div className="wmnds-m-b-xl">
          {tramServices &&
            tramServices.map(serviceRoute => {
              return (
                <Bus
                  lineId={serviceRoute.id}
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
        </>
      ) : (
        <span>You are not subscribed to any services</span>
      )}
    </div>
  );
};

export default RemoveTile;
