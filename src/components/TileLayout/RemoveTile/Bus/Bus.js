import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import style from './Bus.module.scss';

function Bus(props) {
  const { serviceNumber, routeName, handleRemove, showRemove } = props;
  const onClick = () => {
    handleRemove(serviceNumber);
  };
  return (
    <div className={`${style.serviceWrapper}`}>
      <div
        className={`wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md`}
      >
        {serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{routeName}</strong>
      {showRemove && (
        <button
          type="button"
          className={style.removeBtn}
          onClick={() => {
            onClick();
          }}
        >
          <Icon iconName="general-cross" className={`general-cross ${style.closeIcon}`} />
        </button>
      )}
    </div>
  );
}
Bus.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
  showRemove: PropTypes.bool,
};

Bus.defaultProps = {
  handleRemove: () => {},
  showRemove: false,
};

export default Bus;
