import React from 'react';
import PropTypes from 'prop-types';
//  Components
import Button from 'components/shared/Button/Button';
// Custom hooks
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
// Styles
import style from './Bus.module.scss';

const Bus = ({ lineId, serviceNumber, routeName, handleRemove }) => {
  // eslint-disable-next-line no-unused-vars
  const { removeRoute, isFetching } = useFetchDeleteRoute(lineId); // Use a custom hook to assist with deleting a route

  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className="wmnds-col-1 wmnds-col-sm-3-5 wmnds-col-lg-3-5">
          <div className="wmnds-grid wmnds-grid--align-center">
            <div className="wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto">
              {serviceNumber}
            </div>
            <div className="wmnds-col-2-3 wmnds-col-lg-3-4">
              <strong>{routeName}</strong>
            </div>
          </div>
        </div>
        {/* Right side for remove service button */}
        <div className="wmnds-col-1 wmnds-col-sm-2-5 wmnds-col-lg-auto wmnds-grid wmnds-grid--align-center wmnds-grid--justify-end">
          <Button
            className={`wmnds-btn--destructive wmnds-col-1 wmnds-col-lg-auto ${style.removeBtn}`}
            text="Remove service"
            iconRight="general-trash"
            title={`Remove service ${serviceNumber}: ${routeName}`}
            onClick={handleRemove || removeRoute}
          />
        </div>
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-sm wmnds-m-b-sm" />
    </>
  );
};

Bus.propTypes = {
  lineId: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
};

Bus.defaultProps = {
  handleRemove: null,
};

export default Bus;
