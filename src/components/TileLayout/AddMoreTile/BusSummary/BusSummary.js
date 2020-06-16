import React from 'react';
import PropTypes from 'prop-types';
//  Components
import Button from 'components/shared/Button/Button';
// Custom hooks
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
// Styles
import s from './BusSummary.module.scss';

const Bus = ({ lineId, serviceNumber, routeName }) => {
  // const  = service; // Grab the id, name, routeName from the service passed in
  const { removeRoute, isFetching } = useFetchDeleteRoute(lineId); // Use a custom hook to assist with deleting a route

  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className="wmnds-col-1 wmnds-col-sm-auto">
          <div className="wmnds-disruption-indicator-medium wmnds-m-r-md">{serviceNumber}</div>
          <strong>{routeName}</strong>
        </div>

        {/* Right side for remove route button */}
        <Button
          className={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${s.removeBtn}`}
          disabled={isFetching}
          isFetching={isFetching}
          text="Remove service"
          iconRight="general-trash"
          title={`Remove service ${serviceNumber}: ${routeName}`}
          onClick={removeRoute}
        />
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

Bus.propTypes = {
  lineId: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default Bus;
