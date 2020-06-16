import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const Message = ({ type, title, message, className }) => {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    case 'warning':
      iconName = 'warning-circle';
      break;

    default:
      iconName = 'success';
      break;
  }

  return (
    <div className={`wmnds-msg-summary wmnds-msg-summary--${type} ${className}`}>
      <div className="wmnds-msg-summary__header">
        <Icon iconName={`general-${iconName}`} className="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div className="wmnds-msg-summary__info">{message}</div>
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Message.defaultProps = {
  className: null,
  type: 'success',
  title: 'Good service',
  message: 'No incidents reported.',
};

export default Message;