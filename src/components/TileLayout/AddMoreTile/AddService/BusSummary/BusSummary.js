import React from 'react';
import PropTypes from 'prop-types';
//  Components
import Icon from 'components/shared/Icon/Icon';
// Styles
import style from './BusSummary.module.scss';

const Bus = ({ lineId, serviceNumber, routeName, setSelectedServices }) => {
  // Removes this service from the busArr
  const handleClick = () => {
    setSelectedServices((prevState) => prevState.filter((item) => item.lineId !== lineId));
  };
  return (
    <div className={`${style.serviceWrapper} wmnds-m-b-md`}>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className="wmnds-col-1 wmnds-col-sm-auto">
          <div className="wmnds-disruption-indicator-medium wmnds-m-r-md">{serviceNumber}</div>
          <strong>{routeName}</strong>
        </div>

        {/* Right side for remove route button */}
        <button
          type="button"
          className={style.removeBtn}
          title={`Remove service ${serviceNumber}: ${routeName}`}
          onClick={handleClick}
        >
          <Icon iconName="general-cross" className={`general-cross ${style.closeIcon}`} />
        </button>
      </div>
    </div>
  );
};

Bus.propTypes = {
  lineId: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default Bus;
