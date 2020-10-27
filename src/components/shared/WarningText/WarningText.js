import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const WarningText = ({ type,  message, className }) => {
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

  return (
    <div className={`wmnds-warning-text wmnds-warning-text--${type} ${className}`}>
        <Icon iconName={`general-${iconName}`} className="wmnds-warning-text__icon" />
        {message}
    </div>
  );
};

WarningText.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
};

WarningText.defaultProps = {
  className: null,
  type: 'success',
  message: 'No incidents reported.',
};

export default WarningText;
