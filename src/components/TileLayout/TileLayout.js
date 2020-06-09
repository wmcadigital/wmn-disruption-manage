import React from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
// Components
import SummaryBlock from 'components/SummaryBlock/SummaryBlock';

const TileLayout = () => {
  useFetchUser();

  return (
    <>
      <div className="wmnds-col-1 wmnds-col-md-3-5">
        <SummaryBlock />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-1-5">side</div>
    </>
  );
};

export default TileLayout;
