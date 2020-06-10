import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import Bus from './Bus/Bus';

const RemoveTile = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext);

  const BusServices = subscriberState.user.lineId;
  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Remove your services</h2>
      <div className="wmnds-msg-help wmnds-col-1">
        Select services you want to remove from your email alerts list.
      </div>
      <hr className="wmnds-m-t-lg wmnds-m-b-lg" />
      <h3>Bus routes added</h3>
      <div>
        {BusServices && BusServices.length > 0 && (
          <div className={` ${BusServices.length > 0 ? 'wmnds-m-b-xl' : ''}`}>
            {BusServices &&
              BusServices.map((busRoute) => {
                return (
                  <Bus
                    serviceNumber={busRoute.name}
                    routeName={busRoute.idName}
                    key={`${busRoute.id}`}
                    showRemove={true}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveTile;
