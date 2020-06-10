import React from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
import useFetchConfirmServices from 'customHooks/useFetchConfirmServices';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';
import AddMoreTile from './AddMoreTile/AddMoreTile';
import RemoveTile from './RemoveTile/RemoveTile';
import DeleteTile from './DeleteTile/DeleteTile';

const TileLayout = () => {
  useFetchUser();
  useFetchConfirmServices();

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-lg wmnds-p-b-lg wmnds-container">
      <SummaryTile />
      <AddMoreTile />
      <RemoveTile />
      <DeleteTile />
    </div>
  );
};

export default TileLayout;
