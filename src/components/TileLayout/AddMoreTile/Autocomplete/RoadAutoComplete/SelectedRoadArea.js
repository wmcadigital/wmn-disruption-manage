import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon/Icon';
import s from '../ServiceAutocomplete.module.scss';

const SelectedRoadArea = ({ area, clearArea }) => {
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-4-5">
      {/* Close disruption box */}
      <div className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs  ${s.selectedItemBox}`}>
        <strong className={`wmnds-col-auto ${s.selectedSummary}`}>{area.address}</strong>

        <button
          type="button"
          className={s.closeButton}
          onClick={clearArea}
          aria-label="Clear selection"
        >
          <Icon iconName="general-cross" className={`general-cross ${s.closeIcon}`} />
        </button>
      </div>
    </div>
  );
};

// PropTypes
SelectedRoadArea.propTypes = {
  area: PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  clearArea: PropTypes.func.isRequired,
};

export default SelectedRoadArea;
