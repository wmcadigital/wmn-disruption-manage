import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';
import s from './Bus.module.scss';
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';

const Bus = ({ serviceNumber, routeName, handleRemove }) => {
  const { removeRoute } = useFetchDeleteRoute();

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
          className={`wmnds-btn--destructive wmnds-col-auto ${s.removeBtn}`}
          text="Remove route"
          iconRight="general-trash"
          onClick={removeRoute()}
        />
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

Bus.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
};

Bus.defaultProps = {
  handleRemove: () => {},
};

export default Bus;
