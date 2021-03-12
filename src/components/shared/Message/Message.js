import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const Message = ({ type, title, message, className, hasCloseButton }) => {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    case 'warning':
      iconName = 'warning-circle';
      break;

    case 'info':
      iconName = 'info';
      break;

    default:
      iconName = 'success';
      break;
  }

  const closeMessage = (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.parentNode.parentNode.querySelector(
      '.wmnds-msg-summary'
    ).style.display = 'none';
  };

  return (
    <div className={`wmnds-msg-summary wmnds-msg-summary--${type} ${className}`}>
      {hasCloseButton && (
        <button
          type="button"
          className="wmnds-msg-summary__close wmnds-link"
          onClick={(e) => closeMessage(e)}
        >
          Close
          <Icon iconName="general-cross" />
        </button>
      )}
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
  hasCloseButton: PropTypes.bool,
};

Message.defaultProps = {
  className: null,
  type: 'success',
  title: 'Good service',
  message: 'No incidents reported.',
  hasCloseButton: false,
};

export default Message;
