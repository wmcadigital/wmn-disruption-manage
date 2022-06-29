import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterQuietTimes = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState;
  const quietDaysFiltered =
    user && user.quietDays
      ? user.quietDays.map((key) => {
          return Object.values(key);
        })
      : [];
  const subscribedQuietDays = [...quietDaysFiltered.flat()];
  const times = user.quietTimePeriods || [];
  const subscribedQuietHours =
    times &&
    times.map((time) => {
      return {
        id: `${Math.random()}`,
        startHour: time.startTime.substr(0, 2),
        startMinute: time.startTime.substr(3, 3),
        endHour: time.endTime.substr(0, 2),
        endMinute: time.endTime.substr(3, 2),
      };
    });

  return { subscribedQuietDays, subscribedQuietHours, user };
};

export default useFilterQuietTimes;
