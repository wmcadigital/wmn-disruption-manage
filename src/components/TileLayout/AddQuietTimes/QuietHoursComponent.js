import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Context
import { SubscriberContext } from 'globalState/SubscriberContext';
// Components
import Button from 'components/shared/Button/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
// Import styling
import s from './QuietHoursComponent.module.scss';

const QuietHoursComponent = ({ name, quietHours }) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { QuietHours } = subscriberState.user;
  const [hoursArray] = useState({
    id: name,
    startHour: quietHours.startHour,
    startMinute: quietHours.startMinute,
    endHour: quietHours.endHour,
    endMinute: quietHours.endMinute,
  });
  const currentHours = QuietHours.filter((item) => item.id === hoursArray.id);

  const onSelectedChange = (e) => {
    const v = e.target.value;
    const t = e.target.name;
    Object.keys(hoursArray).map((item) => {
      if (item === t) {
        hoursArray[item] = v;
      }
      return item;
    });
    const updatedArray = QuietHours.map((a) => {
      if (a.id === hoursArray.id) {
        // eslint-disable-next-line no-param-reassign
        a = hoursArray;
      }
      return a;
    });
    subscriberDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietHours: [...updatedArray],
      },
    });
  };

  const handleRemoveHours = (id) => {
    subscriberDispatch({ type: 'REMOVE_QUIET_HOURS', payload: id });
  };
  const times = () => {
    const hour = [];
    for (let i = 0; i < 24; i += 1) {
      hour.push(`${`0${i}`.slice(-2)}`);
    }
    return hour;
  };
  const minute = () => {
    const j = [];
    for (let i = 0; i < 60; i += 5) {
      j.push(`${`0${i}`.slice(-2)}`);
    }
    return j;
  };
  const hours = times().map((i) => ({ ...i, value: i, text: i }));
  const minutes = minute().map((i) => ({ ...i, value: i, text: i }));
  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        <div className="wmnds-col-md-2-2">
          <div>
            <h5 className="wmnds-fe-label wmnds-m-none">Start</h5>
            <Dropdown
              parent={name}
              name="startHour"
              options={hours}
              defaultValue={currentHours[0].startHour}
              onChange={onSelectedChange}
            />
            <Dropdown
              parent={name}
              name="startMinute"
              options={minutes}
              defaultValue={currentHours[0].startMinute}
              onChange={onSelectedChange}
            />
          </div>
        </div>
        <div className="wmnds-col-md-1-2">
          <div>
            <h5 className="wmnds-fe-label wmnds-m-none">End</h5>
            <Dropdown
              parent={name}
              name="endHour"
              options={hours}
              defaultValue={currentHours[0].endHour}
              onChange={onSelectedChange}
            />
            <Dropdown
              parent={name}
              name="endMinute"
              options={minutes}
              defaultValue={currentHours[0].endMinute}
              onChange={onSelectedChange}
            />
          </div>
        </div>
        <Button
          className={`${s.button} wmnds-btn--destructive wmnds-col-md-2-1`}
          iconRight="general-trash"
          onClick={() => handleRemoveHours(name)}
        />
      </div>
    </>
  );
};
QuietHoursComponent.propTypes = {
  name: PropTypes.string,
  quietHours: PropTypes.oneOfType([PropTypes.shape, PropTypes.object]).isRequired,
};

QuietHoursComponent.defaultProps = {
  name: '',
};

export default QuietHoursComponent;
