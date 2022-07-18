import React from 'react';
import PropTypes from 'prop-types';

const HoursMinutes = ({ times }) => {
  if (times && times.length > 0) {
    return times.map((time, i) => {
      let last = false;
      if (times.length - 1 === i) {
        last = true;
      }
      return (
        <span key={Math.random()}>
          <strong> {time.startHour}</strong>:<strong>{time.startMinute} </strong>
          and
          <strong> {time.endHour}</strong>:<strong>{time.endMinute}</strong>
          {!last && <span>,</span>}
        </span>
      );
    });
  }
  return false;
};
HoursMinutes.propTypes = {
  times: PropTypes.oneOfType([PropTypes.shape, PropTypes.array]).isRequired,
};
export default HoursMinutes;
