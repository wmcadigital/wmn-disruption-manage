import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TrainAutoCompleteResult from './TrainAutoCompleteResult';
// Local CustomHooks
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import SelectedTrainStation from './SelectedTrainStation/SelectedTrainStation';

const TrainAutoComplete = ({ mode, setMode, trainStations, setTrainStations, to }) => {
  const [query, setQuery] = useState(); // placeholder for getting/setting query

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // customHook used to fetch results based on query
  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/rail/v2/station?q=${encodeURI(query)}`,
    'train',
    query,
    to
  );

  const selectedService = to ? trainStations.To : trainStations.From;

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, debounceInput, results);

  // Go back to prev step if cancel
  const handleCancel = () => {
    setMode(null);
  };

  return (
    <>
      {selectedService && selectedService?.id ? (
        <SelectedTrainStation
          selectedService={selectedService}
          setTrainStations={setTrainStations}
        />
      ) : (
        <div className="wmnds-grid wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-4-5">
            <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
              <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
              <div className="wmnds-loader" role="alert" aria-live="assertive">
                <p className="wmnds-loader__content">Content is loading...</p>
              </div>
              <DebounceInput
                type="text"
                name="trainStationSearch"
                placeholder="Search for a train station"
                className="wmnds-fe-input wmnds-autocomplete__input"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search for a train station"
                debounceTimeout={600}
                onKeyDown={(e) => handleKeyDown(e)}
                inputRef={debounceInput}
              />
            </div>
            {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
            {!results.length && query && !loading && errorInfo ? (
              <Message type="error" title={errorInfo.title} message={errorInfo.message} />
            ) : (
              query && (
                <ul className="wmnds-autocomplete-suggestions wmnds-m-b-none" ref={resultsList}>
                  {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
                   */}
                  {results.map((result) => {
                    return (
                      <TrainAutoCompleteResult
                        key={result.id}
                        result={result}
                        handleKeyDown={handleKeyDown}
                        type={mode}
                        handleCancel={handleCancel}
                        setTrainStations={setTrainStations}
                        to={to}
                      />
                    );
                  })}
                </ul>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

// PropTypes
TrainAutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  trainStations: PropTypes.objectOf(PropTypes.any).isRequired,
  setTrainStations: PropTypes.func.isRequired,
  to: PropTypes.bool,
};

// Default props
TrainAutoComplete.defaultProps = {
  to: false,
};

export default TrainAutoComplete;
