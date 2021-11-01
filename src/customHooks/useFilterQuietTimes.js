import { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFilterQuietTimes = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState;
  const subscribedQuietDays = user.QuietDays;
  const times = user.QuietTimePeriods || [];
  const subscribedQuietHours =
    times ||
    times.map((time) => {
      return {
        id: `${Math.random()}`,
        startHour: time.StartTime.substr(11, 2),
        startMinute: time.StartTime.substr(14, 2),
        endHour: time.EndTime.substr(11, 2),
        endMinute: time.EndTime.substr(14, 2),
      };
    });
  return { subscribedQuietDays, subscribedQuietHours, user };
};

export default useFilterQuietTimes;
