import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterSubscribedServices = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { user } = subscriberState;
  const allServices = subscriberState.user.lineId;
  const busServices = allServices ? allServices.filter((service) => service.id !== '4546') : [];
  const tramServices = subscriberState.user.tramLines;
  const trainServices = subscriberState.user.trainLines;
  const roadAreas = subscriberState.user.roadLines;

  return { allServices, busServices, tramServices, trainServices, roadAreas, user };
};

export default useFilterSubscribedServices;
