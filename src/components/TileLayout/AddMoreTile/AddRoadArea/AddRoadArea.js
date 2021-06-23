import React from 'react';
import PropTypes from 'prop-types';
//
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddRoadArea = ({ setMode, selectedServices, setSelectedServices }) => {
  const { RoadAreas } = selectedServices;

  const handleRemoveRoad = (lat, lon) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        RoadAreas: prevState.RoadAreas.filter((area) => area.lat !== lat && area.lon !== lon),
      };
    });
  };

  const handleAddRoad = () => setMode('road');

  return (
    <>
      <h3 className="wmnds-p-t-md">Roads</h3>
      <Button
        className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        text={`Add ${RoadAreas && RoadAreas.length > 0 ? 'another' : ''} road area`}
        onClick={handleAddRoad}
        iconRight="general-expand"
      />

      {/* Add chosen bus services */}
      {RoadAreas && RoadAreas.length > 0 && (
        <>
          <h4>Bus services that you want to add</h4>
          {RoadAreas.map((area) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveRoad(area.lat, area.lon)}
                mode="road"
                routeName={`${area.address} + ${area.radius} miles`}
                key={`${area.lat}${area.lon}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};

AddRoadArea.propTypes = {
  setMode: PropTypes.func.isRequired, // Set custom button classes, will default to wmnds-btn (primary btn)
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
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddRoadArea;
