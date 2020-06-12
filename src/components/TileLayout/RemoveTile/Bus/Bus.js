import React from 'react';
import PropTypes from 'prop-types';
//  Components
import Button from 'components/shared/Button/Button';
// Custom hooks
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
// Styles
import s from './Bus.module.scss';

const Bus = ({ service }) => {
  const { id, name, idName } = service; // Grab the id, name, idName from the service passed in
  const { removeRoute, isFetching } = useFetchDeleteRoute(id); // Use a custom hook to assist with deleting a route

  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className="wmnds-col-1 wmnds-col-sm-auto">
          <div className="wmnds-disruption-indicator-medium wmnds-m-r-md">{name}</div>
          <strong>{idName}</strong>
        </div>

        {/* Right side for remove route button */}
        <Button
          className={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${s.removeBtn}`}
          disabled={isFetching}
          isFetching={isFetching}
          text="Remove route"
          iconRight="general-trash"
          onClick={removeRoute}
        />
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

Bus.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    idName: PropTypes.string,
  }).isRequired,
};

export default Bus;
