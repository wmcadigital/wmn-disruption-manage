import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from 'components/shared/Button/Button';
import RoadAutoCompleteInput from './RoadAutoCompleteInput';
import RoadAutoCompleteRadiusInput from './RoadAutoCompleteRadiusInput/RoadAutoCompleteRadiusInput';
import RoadAutoCompleteMap from './RoadAutoCompleteMap/RoadAutoCompleteMap';

const RoadAutoComplete = ({ setSelectedServices, selectedServices, closeAutoComplete }) => {
  const [area, setArea] = useState(null);

  const initialRadius = 3;
  const [radius, setRadius] = useState(initialRadius);
  useEffect(() => {
    if (!area) setRadius(initialRadius);
  }, [area]);

  const addRoadArea = () => {
    const newRoadArea = {
      address: area.address,
      lat: area.location.y,
      lon: area.location.x,
      radius,
    };

    setSelectedServices((prevState) => {
      return {
        ...prevState,
        RoadAreas: [...prevState.RoadAreas, newRoadArea],
      };
    });

    closeAutoComplete();
  };

  return (
    <>
      <div className="wmnds-col-1">
        <h4>Enter a location</h4>
        <p className="wmnds-m-b-sm">A postcode, a road name or a place of interest</p>
        <RoadAutoCompleteInput
          selectedAreas={selectedServices.RoadAreas}
          area={area}
          setRoadArea={setArea}
        />
      </div>
      {area && (
        <div className="wmnds-col-1 wmnds-m-t-md">
          <h4 className="wmnds-m-b-md">Enter search radius (miles)</h4>
          <RoadAutoCompleteRadiusInput radius={radius} setRadius={setRadius} />
          <RoadAutoCompleteMap lat={area.location.y} lon={area.location.x} radius={radius} />
        </div>
      )}
      <div className="wmnds-col-1 wmnds-col-md-2-5">
        {area && (
          <Button
            className="wmnds-btn wmnds-m-r-md wmnds-m-t-md"
            text="Continue"
            onClick={addRoadArea}
          />
        )}
        <Button
          className="wmnds-btn wmnds-btn--primary wmnds-m-t-md"
          text="Cancel"
          onClick={closeAutoComplete}
        />
      </div>
    </>
  );
};

RoadAutoComplete.propTypes = {
  setSelectedServices: PropTypes.func.isRequired,
  selectedServices: PropTypes.shape({
    RoadAreas: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  closeAutoComplete: PropTypes.func.isRequired,
};

export default RoadAutoComplete;
