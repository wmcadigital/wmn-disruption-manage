import React from 'react';
import Icon from '../Icon/Icon';

const GenericError = ({
  title = 'There is a problem',
  desc = 'Please check your answers again.',
}) => {
  return (
    <div className="wmnds-msg-summary wmnds-msg-summary--error wmnds-m-b-lg">
      <div className="wmnds-msg-summary__header">
        <Icon iconName="general-warning-triangle" className="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div className="wmnds-msg-summary__info">{desc}</div>
    </div>
  );
};

export default GenericError;
