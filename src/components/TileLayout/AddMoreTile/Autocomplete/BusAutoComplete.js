import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// Components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './AutoCompleteResult';

import style from './ServiceAutocomplete.module.scss';

const BusAutoComplete = ({ mode, setMode, setBus }) => {
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const [searchResults, setSearchResults] = useState();
  const [lineNumber, setLineNumber] = useState();
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // const [formDataState] = useContext(FormDataContext);
  // const busId = formDataState.formData.LineId;

  const updateQuery = (query) => {
    setErrorInfo(null);
    setLineNumber(query);
  };

  const handleCancel = () => {
    setMode(null);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (lineNumber) {
      const { REACT_APP_AUTOCOMPLETE_API, REACT_APP_AUTOCOMPLETE_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(`${REACT_APP_AUTOCOMPLETE_API}/bus/v1/service?q=${encodeURI(lineNumber)}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_AUTOCOMPLETE_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((bus) => {
          setLoading(false); // Set loading state to false after data is received
          // If bus.data.services isn't there, then we can't map the results to it, so return null
          if (bus.data.services.length === 0) {
            setErrorInfo({
              title: 'No results found',
              message: 'Apologies, could not find the service.',
            });
          } else {
            setSearchResults(bus.data.services);
          }
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            setLoading(false); // Set loading state to false after data is received
            // Update error message
            setErrorInfo({
              title: 'Please try again',
              message: 'Apologies, we are having technical difficulties.',
            });
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    } else {
      setLoading(false);
    }
    // Unmount / cleanup
    return () => {
      mounted = false; // Set mounted back to false on unmount
      source.cancel(); // cancel the request
    };
  }, [lineNumber]);

  // Function for handling keyboard/keydown events (controls the up/down arrow on autocomplete results)
  const handleKeyDown = ({ keyCode, target }) => {
    // Keycodes:
    // 40 = down arrow
    // 38 = up arrow
    // 13 = enter
    // 32 = space

    // If down arrow pressed and current target is input (we are still in autocomplete debounce) and there are results
    if (target.localName === 'input') {
      if (keyCode === 40 && searchResults.length) {
        resultsList.current.firstChild.focus(); // Then focus on the first child in results list
      }
    } else {
      // If down arrow and there is a next sibling/result
      if (keyCode === 40 && target.nextSibling) {
        target.nextSibling.focus(); // Then focus on next sibling/result
      }
      // Else if up arrow and there is a prev sibling/result
      else if (keyCode === 38 && target.previousSibling) {
        target.previousSibling.focus(); // Then focus on prev sibling/result
      }
      // Else if up arrow and no previous sibling
      else if (keyCode === 38) {
        debounceInput.current.focus(); // Then focus back on autoComplete input
      }
      // If enter or space pressed
      if (keyCode === 13 || keyCode === 32) {
        target.click(); // then emulate click event (select it)
      }
    }
  };
  return (
    <>
      <div className="wmnds-m-b-xl wmnds-col-1">
        <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
          <div className="wmnds-wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-2-5">
            <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
            <DebounceInput
              type="text"
              name="busSearch"
              placeholder="Search for a service"
              className="wmnds-fe-input wmnds-autocomplete__input"
              value={lineNumber || ''}
              onChange={(e) => updateQuery(e.target.value)}
              aria-label="Search for a service"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
        </div>

        {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
        {!loading && errorInfo ? (
          <Message type="error" title={errorInfo.title} message={errorInfo.message} />
        ) : (
          searchResults && (
            <div className="wmnds-wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-2-5">
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {searchResults.map((result) => {
                  // eslint-disable-next-line no-unused-expressions
                  return (
                    <BusAutoCompleteResult
                      key={result.id}
                      result={result}
                      handleKeyDown={handleKeyDown}
                      type={mode}
                      handleCancel={handleCancel}
                      setBus={setBus}
                    />
                  );
                })}
              </ul>
            </div>
          )
        )}
      </div>
      <button
        type="button"
        className={`wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-xl ${style.wmndsError}`}
        onClick={() => handleCancel()}
      >
        Cancel
      </button>
    </>
  );
};

BusAutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  setBus: PropTypes.func.isRequired,
};

export default BusAutoComplete;
