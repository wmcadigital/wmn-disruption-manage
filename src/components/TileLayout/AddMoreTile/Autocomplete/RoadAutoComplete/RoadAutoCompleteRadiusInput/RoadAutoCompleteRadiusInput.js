import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

import s from './RoadAutoCompleteRadiusInput.module.scss';
// Helpers
const minRadius = 1;
const maxRadius = 10;
const clampRadius = (value) => Math.min(Math.max(value, minRadius), maxRadius);

const RoadAutoCompleteRadiusInput = ({ radius, setRadius }) => {
  const updateRadius = (value) => setRadius(clampRadius(value));
  const incrementRadius = () => updateRadius(radius + 1);
  const decrementRadius = () => updateRadius(radius - 1);

  return (
    <div className="wmnds-col-1 wmnds-m-b-md">
      <div className={` ${s.radiusInput}`}>
        <button
          type="button"
          className={`${s.radiusInputButton}`}
          onClick={decrementRadius}
          aria-label="Decrease radius by 1"
        >
          <Icon iconName="general-minimise" iconClass="wmnds-autocomplete__icon" />
        </button>
        <input
          type="number"
          name="searchRadius"
          value={radius}
          min={minRadius}
          max={maxRadius}
          onChange={(e) => updateRadius(e.target.value)}
          className={`wmnds-fe-input wmnds-autocomplete__input wmnds-p-l-sm wmnds-text-align-center ${s.radiusInputInput}`}
          aria-label="Enter search radius in miles"
        />
        <button
          type="button"
          className={`${s.radiusInputButton}`}
          onClick={incrementRadius}
          aria-label="Increase radius by 1"
        >
          <Icon iconName="general-expand" iconClass="wmnds-autocomplete__icon" />
        </button>
      </div>
    </div>
  );
};

RoadAutoCompleteRadiusInput.propTypes = {
  radius: PropTypes.number.isRequired,
  setRadius: PropTypes.func.isRequired,
};

export default RoadAutoCompleteRadiusInput;
