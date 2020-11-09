import { useEffect, useState } from 'react';
import axios from 'axios';
// Import contexts

const useAutoCompleteAPI = (apiPath, mode, query, to) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging

  useEffect(() => {
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (query) {
      const { REACT_APP_AUTOCOMPLETE_API, REACT_APP_AUTOCOMPLETE_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(REACT_APP_AUTOCOMPLETE_API + apiPath, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_AUTOCOMPLETE_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((response) => {
          setLoading(false); // Set loading state to false after data is received
          // BUS
          if (mode === 'bus') {
            setResults(response.data.services || []);
          }
          // TRAM
          else if (mode === 'tram') {
            setResults(response.data.data || []);
          }
          // TRAIN
          else if (mode === 'train') {
            setResults(response.data.data || []);
          }

          if ((!response.data.data || !response.data.services) && mounted) {
            // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
            // if no bus data, set error
            setErrorInfo({
              title: 'No results found',
              message: 'Make sure you are looking for the right service, and try again.',
            });
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
  }, [apiPath, mode, query, to]);

  return { loading, errorInfo, results };
};

export default useAutoCompleteAPI;
