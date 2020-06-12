import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
import s from './Bus.module.scss';

const Bus = ({ service }) => {
  const { id, name, idName } = service;
  const { removeRoute } = useFetchDeleteRoute(id);

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
