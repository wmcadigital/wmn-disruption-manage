import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon/Icon';
import s from '../ServiceAutocomplete.module.scss';

const SelectedTramStop = ({ tramStop, clearTramStop }) => {
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-4-5">
      {/* Close disruption box */}
      <div className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs  ${s.selectedItemBox}`}>
        <strong className={`wmnds-col-auto ${s.selectedSummary}`}>{tramStop.name}</strong>

        <button type="button" className={s.closeButton} onClick={clearTramStop}>
          <Icon iconName="general-cross" className={`general-cross ${s.closeIcon}`} />
        </button>
      </div>
    </div>
  );
};

// PropTypes
SelectedTramStop.propTypes = {
  tramStop: PropTypes.objectOf(PropTypes.any).isRequired,
  clearTramStop: PropTypes.func.isRequired,
};

export default SelectedTramStop;
