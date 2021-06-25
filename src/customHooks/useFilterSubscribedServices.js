import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterSubscribedServices = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { user } = subscriberState;
  const allServices = subscriberState.user.lineId;
  const busServices = allServices ? allServices.filter((service) => service.id !== '4546') : [];
  const tramServices = subscriberState.user.tramLines;
  const trainServices = subscriberState.user.trainLines;
  const roadAreas = subscriberState.user.roadLines.map((area) => {
    return {
      id: area.id,
      address: area.name,
      lat: area.lat,
      lon: area.lon,
      radius: area.distance / 1609.34,
    };
  });

  return { allServices, busServices, tramServices, trainServices, roadAreas, user };
};

export default useFilterSubscribedServices;
