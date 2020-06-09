import React from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';
import AddMoreTile from './AddMoreTile/AddMoreTile';
import DeleteTile from './DeleteTile/DeleteTile';

const TileLayout = () => {
  useFetchUser();

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-lg wmnds-p-b-lg wmnds-container">
      <SummaryTile />
      <AddMoreTile />
      <DeleteTile />
    </div>
  );
};

export default TileLayout;
