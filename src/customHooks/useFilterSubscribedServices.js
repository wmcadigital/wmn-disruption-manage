import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterSubscribedServices = () => {
  const [subscriberState] = useContext(SubscriberContext);
  const allServices = subscriberState.user.lineId;
  const busServices = allServices.filter((service) => service.id !== '4546');
  const tramServices = allServices.filter((service) => service.id === '4546');

  return { allServices, busServices, tramServices };
};

export default useFilterSubscribedServices;
