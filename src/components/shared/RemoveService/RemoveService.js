import React from 'react';
import PropTypes from 'prop-types';
// Custom Hooks
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
// Styles
import style from './RemoveService.module.scss';
// Components
import Button from '../Button/Button';

const RemoveService = ({ id, serviceNumber, routeName, onClick, showRemove, mode }) => {
  const { removeRoute, removeLine } = useFetchDeleteRoute(id);

  const handleCancel = () => {
    if (mode === 'train') {
      removeLine();
    } else {
      removeRoute();
    }
  };

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
            text={mode === 'train' ? 'Remove line' : 'Remove service'}
            iconRight="general-trash"
            title={`Remove ${serviceNumber}${mode !== 'train' ? `: ${routeName}` : ' line'}`}
            onClick={onClick || handleCancel}
          />
        )}
      </div>

      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

RemoveService.propTypes = {
  id: PropTypes.string.isRequired,
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
