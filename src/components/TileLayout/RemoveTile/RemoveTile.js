import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Bus from './Bus/Bus';

const RemoveTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const busServices = subscriberState.user.lineId;

  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Remove your services</h2>
      <p>Remove services you no longer want alerts for.</p>
      <hr className="wmnds-m-t-md wmnds-m-b-md" />
      <h3>Bus services added</h3>
      {/* If we have bus services then map through them */}
      {busServices && busServices.length > 0 ? (
        <div className={`${busServices.length > 0 ? 'wmnds-m-b-xl' : ''}`}>
          {busServices &&
            busServices.map((busRoute) => {
              return (
                <Bus
                  lineId={busRoute.id}
                  serviceNumber={busRoute.name}
                  routeName={busRoute.idName}
                  key={busRoute.id}
                />
              );
            })}
        </div>
      ) : (
        <span>You are not subscribed to any services</span>
      )}
    </div>
  );
};

export default RemoveTile;
