import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon/Icon';
import s from './SelectedTrainStation.module.scss';

const SelectedTrainStation = ({ selectedService, setTrainStations }) => {
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-4-5">
      {/* Close disruption box */}
      <div className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs  ${s.selectedItemBox}`}>
        <strong className={`wmnds-col-auto ${s.selectedSummary}`}>{selectedService.name}</strong>

        <button type="button" className={s.closeButton} onClick={() => setTrainStations({})}>
          <Icon iconName="general-cross" className={`general-cross ${s.closeIcon}`} />
        </button>
      </div>
    </div>
  );
};

// PropTypes
SelectedTrainStation.propTypes = {
  selectedService: PropTypes.objectOf(PropTypes.any).isRequired,
  setTrainStations: PropTypes.func.isRequired,
};

export default SelectedTrainStation;
