import React from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';

const TileLayout = () => {
  useFetchUser();

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-lg wmnds-p-b-lg wmnds-container">
      <div className="wmnds-col-1 wmnds-col-md-3-5">
        <SummaryTile />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-1-5">side</div>
    </div>
  );
};

export default TileLayout;
