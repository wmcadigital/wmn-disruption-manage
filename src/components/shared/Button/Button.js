// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const Button = ({
  className,
  disabled,
  iconLeft,
  iconRight,
  isActive,
  onClick,
  text,
  title,
  type,
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={title}
      className={`wmnds-btn ${className} ${isActive ? 'wmnds-is--active' : ''} ${
        disabled ? 'wmnds-btn--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* If icon left is set then call icon component and inject correct svg */}
      {iconLeft ? <Icon iconClass="wmnds-btn__icon" iconName={iconLeft} /> : null}
      {/* button text will go here, if any */}
      {text}
      {/* If icon right is set then call icon component and inject correct svg */}
      {iconRight && (
        <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName={iconRight} />
      )}
    </button>
  );
};

// Set props
Button.propTypes = {
  className: PropTypes.string, // Set custom button classes, will default to wmnds-btn (primary btn)
  disabled: PropTypes.bool, // Sets if the button is disabled or not
  iconLeft: PropTypes.string, // Set icon left on button
  iconRight: PropTypes.string, // Set icon right on button
  isActive: PropTypes.bool, // If button is active, add active class
  onClick: PropTypes.func, // Set an onclick event
  text: PropTypes.string, // text inside button
  type: PropTypes.string, // button type, by default it is type="button"
  title: PropTypes.string, // title on the button
};

Button.defaultProps = {
  className: '',
  disabled: false,
  iconLeft: null,
  iconRight: null,
  isActive: false,
  onClick: null,
  text: '',
  title: null,
  type: 'button',
};

export default Button;
