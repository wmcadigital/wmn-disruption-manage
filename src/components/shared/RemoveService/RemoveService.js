import React from 'react';
import PropTypes from 'prop-types';
// Styles
import style from './RemoveService.module.scss';
// Components
import Button from '../Button/Button';

const RemoveService = ({ serviceNumber, routeName, onClick, showRemove, mode }) => {
  const buttonTitle = `Remove ${serviceNumber}${mode !== 'train' ? `: ${routeName}` : ' line'}`;
  const buttonText = mode === 'train' ? 'Remove line' : 'Remove service';

  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className={`${style.leftWrap} wmnds-grid wmnds-grid--align-center`}>
          <div
            className={`wmnds-disruption-indicator-medium wmnds-m-r-sm wmnds-col-auto ${style[mode]}`}
          >
            {serviceNumber}
          </div>

          {routeName && <strong className="wmnds-col-auto">{routeName}</strong>}
        </div>

        {/* Right side for remove service button */}
        {showRemove && (
          <Button
            className={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${style.removeBtn}`}
            text={buttonText}
            iconRight="general-trash"
            title={buttonTitle}
            onClick={onClick}
          />
        )}
      </div>

      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

RemoveService.propTypes = {
  onClick: PropTypes.func,
  mode: PropTypes.string.isRequired,
  routeName: PropTypes.string,
  serviceNumber: PropTypes.string.isRequired,
  showRemove: PropTypes.bool,
};

RemoveService.defaultProps = {
  onClick: null,
  routeName: null,
  showRemove: false,
};

export default RemoveService;
