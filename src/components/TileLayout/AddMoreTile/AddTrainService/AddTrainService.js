import React from 'react';
import PropTypes from 'prop-types';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddTrainService = ({ setMode, selectedServices, setSelectedServices }) => {
  const { Trains } = selectedServices;

  const handleRemoveTrain = (id) => {
    // If there is just one line left, then we reset the trains object as there is nothing else to remove so we may as well get rid of all train state (all stations user has built up)
    if (Trains[0].LineIds.length === 1) {
      setSelectedServices((prevState) => {
        return { ...prevState, Trains: [] };
      });
    }
    // Else, remove individual train line
    else {
      const removedTrains = Trains;
      removedTrains[0].LineIds = Trains[0].LineIds.filter((line) => line !== id);

      setSelectedServices((prevState) => {
        return { ...prevState, Trains: removedTrains };
      });
    }
  };

  const handleAddTrain = () => setMode('train');

  return (
    <>
      <h3 className="wmnds-p-t-md">Trains</h3>
      <Button
        className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        text={`Add ${Trains && Trains.length > 0 ? 'another' : ''} train service`}
        onClick={handleAddTrain}
        iconRight="general-expand"
      />

      {/* Add chosen bus services */}
      {Trains && Trains.length > 0 && (
        <>
          <h4>Train lines that you want to add</h4>
          {Trains[0].LineIds.map((line) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveTrain(line)}
                serviceNumber={line}
                key={line}
                mode="train"
              />
            );
          })}
        </>
      )}
    </>
  );
};

AddTrainService.propTypes = {
  setMode: PropTypes.func.isRequired, // Set custom button classes, will default to wmnds-btn (primary btn)
  selectedServices: PropTypes.shape({
    TramServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    BusServices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired,
        serviceNumber: PropTypes.string.isRequired,
      })
    ),
    Trains: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.string.isRequired,
        From: PropTypes.string.isRequired,
        LineIds: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddTrainService;
