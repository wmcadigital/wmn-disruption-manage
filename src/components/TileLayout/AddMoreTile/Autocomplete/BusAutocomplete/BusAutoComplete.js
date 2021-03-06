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

const BusAutoComplete = ({ setSelectedServices, closeAutoComplete }) => {
  const [query, setQuery] = useState(); // placeholder for getting/setting query
  const { busServices } = useFilterSubscribedServices(); // Get currently selected bus services

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // Remove all spaces for the query so the user can still get results when query is formatted incorrectly
  const formatQuery = (queryString) => {
    if (!queryString) return '';
    return queryString.replace(/\s/g, '').trim();
  };

  // customHook used to fetch results based on query
  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/api/lineinfo?q=${encodeURI(formatQuery(query))}`,
    'bus',
    query
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, debounceInput, results);

  const busSorting = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const serviceNumberA = a.serviceNumber.toUpperCase();
    const serviceNumberB = b.serviceNumber.toUpperCase();
    const routeNameA = a.routes[0].routeName.toUpperCase();
    const routeNameB = b.routes[0].routeName.toUpperCase();
    let comparison = 0;
    if (serviceNumberA > serviceNumberB) {
      comparison = 1;
    } else if (serviceNumberA < serviceNumberB) {
      comparison = -1;
    } else if (routeNameA > routeNameB) {
      // if service number is equal compare route name
      comparison = 1;
    } else if (routeNameA < routeNameB) {
      // if service number is equal compare route name
      comparison = -1;
    }
    return comparison;
  };

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
            <Message
              type="error"
              title={errorInfo.title}
              message={errorInfo.message}
              className="wmnds-m-t-md"
            />
          ) : (
            query && (
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
                 */}
                {results
                  .filter((result) => !busServices.some((el) => el.id === result.id))
                  .sort(busSorting)
                  .map((result) => (
                    // eslint-disable-next-line no-unused-expressions
                    <BusAutoCompleteResult
                      key={result.id}
                      result={result}
                      handleKeyDown={handleKeyDown}
                      closeAutoComplete={closeAutoComplete}
                      setSelectedServices={setSelectedServices}
                    />
                  ))}
              </ul>
            )
          )}
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-5 wmnds-m-t-sm">
          <Button
            className="wmnds-btn wmnds-btn--primary wmnds-col-auto wmnds-col-md-1 wmnds-float-right"
            text="Cancel"
            onClick={closeAutoComplete}
          />
        </div>
      </div>
    </>
  );
};

BusAutoComplete.propTypes = {
  setSelectedServices: PropTypes.func.isRequired,
  closeAutoComplete: PropTypes.func.isRequired,
};

export default BusAutoComplete;
