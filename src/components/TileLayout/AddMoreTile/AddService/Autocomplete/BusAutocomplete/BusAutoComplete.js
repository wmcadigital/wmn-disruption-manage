import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// Components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import useFilterSubscribedServices from 'customHooks/useFilterSubscribedServices';
import Button from 'components/shared/Button/Button';
import BusAutoCompleteResult from './BusAutoCompleteResult';
// Local CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const BusAutoComplete = ({ mode, setMode, setSelectedServices }) => {
  const [query, setQuery] = useState(); // placeholder for getting/setting query
  const { busServices } = useFilterSubscribedServices(); // Get currently selected bus services

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // customHook used to fetch results based on query
  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/bus/v1/service?q=${encodeURI(query)}`,
    'bus',
    query
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, debounceInput, results);

  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xl">
        <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-m-t-sm">
          <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
            <div className="wmnds-col-1">
              <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
              <div className="wmnds-loader" role="alert" aria-live="assertive">
                <p className="wmnds-loader__content">Content is loading...</p>
              </div>
              <DebounceInput
                id="busSearch"
                type="text"
                name="busSearch"
                placeholder="Search for a bus service"
                className="wmnds-fe-input wmnds-autocomplete__input"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search for a bus service"
                debounceTimeout={600}
                onKeyDown={(e) => handleKeyDown(e)}
                inputRef={debounceInput}
              />
            </div>
          </div>

          {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
          {!results.length && query && !loading && errorInfo ? (
            <Message type="error" title={errorInfo.title} message={errorInfo.message} />
          ) : (
            query && (
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
                 */}
                {results
                  .filter((result) => !busServices.some((el) => el.id === result.id))
                  .map((result) => {
                    // eslint-disable-next-line no-unused-expressions
                    return (
                      <BusAutoCompleteResult
                        key={result.id}
                        result={result}
                        handleKeyDown={handleKeyDown}
                        type={mode}
                        setSelectedServices={setSelectedServices}
                        setMode={setMode}
                      />
                    );
                  })}
              </ul>
            )
          )}
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-5 wmnds-m-t-sm">
          <Button
            className="wmnds-btn wmnds-btn--primary wmnds-col-auto wmnds-col-md-1 wmnds-float-right"
            text="Cancel"
            onClick={() => setMode(null)}
          />
        </div>
      </div>
    </>
  );
};

BusAutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default BusAutoComplete;
