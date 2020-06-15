import React from 'react';
// Custom hooks
import useFetchUser from 'customHooks/useFetchUser';
import useFetchConfirmServices from 'customHooks/useFetchConfirmServices';
// Components
import SummaryTile from 'components/TileLayout/SummaryTile/SummaryTile';
import AddMoreTile from './AddMoreTile/AddMoreTile';
import RemoveTile from './RemoveTile/RemoveTile';
import DeleteTile from './DeleteTile/DeleteTile';
import LoadingView from './LoadingView/LoadingView';
import ErrorView from './ErrorView/ErrorView';

const TileLayout = () => {
  const { confirmServiceIsFinished } = useFetchConfirmServices(); // Run confirm new services before fetching user and return var if it has completed. This ensures that when we fetch the user, we have the most up to date lines they have confirmed.
  const { isFetching, hasError } = useFetchUser(confirmServiceIsFinished); // Then fetch the user

  return (
    <>
      {isFetching && <LoadingView />}

      {!isFetching && !hasError && (
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-p-t-lg wmnds-p-b-lg wmnds-container">
          <div className="wmnds-col-1 wmnds-col-md-3-4">
            <div className="wmnds-grid">
              <SummaryTile />
              <AddMoreTile />
              <RemoveTile />
              <DeleteTile />
            </div>
          </div>
        </div>
      )}

      {!isFetching && hasError && <ErrorView hasError={hasError} />}
    </>
  );
};

export default TileLayout;
