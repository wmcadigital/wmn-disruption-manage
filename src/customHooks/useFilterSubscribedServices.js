import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterSubscribedServices = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const { user } = subscriberState;
  const allServices = subscriberState.user.lineId;
  const busServices = allServices ? allServices.filter((service) => service.id !== '4546') : [];
  const tramServices = allServices ? allServices.filter((service) => service.id === '4546') : [];
  const trainServices = subscriberState.user.trainLines;

  return { allServices, busServices, tramServices, trainServices, user };
};

export default useFilterSubscribedServices;
