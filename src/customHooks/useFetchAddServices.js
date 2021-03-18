import { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// State
import { SubscriberContext } from 'globalState/SubscriberContext';
// Hooks
import useSelectableTramLines from 'customHooks/useSelectableTramLines';

const useFetchAddServices = (selectedServices, resend) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [hasError, setHasError] = useState(null);

  // Fetching functions
  const finishFetching = () => setIsFetching(false);
  const catchErrors = (error) => {
    // eslint-disable-next-line no-console
    console.error({ error });
    setHasError(true);
  };

  // Variables for tram logic
  const { filterTramLineInfo } = useSelectableTramLines();
  const shouldReplaceTramLineWithStops =
    subscriberState.user.tramLines.length && filterTramLineInfo(selectedServices.LineId).length > 0;

  const shouldReplaceTramStopsWithLine =
    selectedServices.TramLines.length &&
    filterTramLineInfo(subscriberState.user.lineId.map((line) => line.id)).length > 0;

  const deleteTramSubscriptions = useCallback(() => {
    const { secret } = subscriberState.query;
    let dataToDelete;

    // decide which tram subscriptions need to be replaced
    if (shouldReplaceTramStopsWithLine) {
      const tramLineInfo = filterTramLineInfo(subscriberState.user.lineId.map((line) => line.id));
      const lineId = tramLineInfo.map((line) => line.id);
      dataToDelete = { lineId, secret };
    } else if (shouldReplaceTramLineWithStops) {
      const TramLines = subscriberState.user.tramLines.map((line) => line.id);
      dataToDelete = { TramLines };
    }

    return axios({
      baseURL: `${process.env.REACT_APP_API_HOST}api`,
      url: `/person/${subscriberState.query.user}`,
      method: 'DELETE',
      data: dataToDelete,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(catchErrors);
  }, [
    filterTramLineInfo,
    shouldReplaceTramLineWithStops,
    shouldReplaceTramStopsWithLine,
    subscriberState.query,
    subscriberState.user.lineId,
    subscriberState.user.tramLines,
  ]);

  const addServices = useCallback(
    (data) =>
      axios({
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        url: `/personlocal/${subscriberState.query.user}`,
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText, response.Message);
          }
          // If the PUT was successful
          setHasError(false);
          const payload = response.data;
          subscriberDispatch({ type: 'MAP_USER_DETAILS', payload }); // Map user details to state
        })
        .catch(catchErrors)
        .finally(finishFetching),
    [subscriberDispatch, subscriberState.query.user]
  );

  useEffect(() => {
    if (selectedServices && resend) {
      const { Trains, LineId, TramLines } = selectedServices;

      const lineIdsToSubmit = LineId.length > 0 ? LineId : null;
      const tramLinesToSubmit = TramLines.map((line) => ({ From: line.From.id, To: line.To.id }));

      const dataToAdd = {
        LineId: lineIdsToSubmit,
        Trains,
        TramLines: tramLinesToSubmit,
        emailDisabled: subscriberState.user.emailDisabled,
      }; // Structure the data before sending

      // Start api fetching
      setIsFetching(true);
      const addOtherServices = () => addServices(dataToAdd); // create variable to help readability

      if (shouldReplaceTramStopsWithLine || shouldReplaceTramLineWithStops) {
        deleteTramSubscriptions().then(addOtherServices);
      } else {
        addOtherServices();
      }
    }
  }, [
    addServices,
    deleteTramSubscriptions,
    resend,
    selectedServices,
    shouldReplaceTramLineWithStops,
    shouldReplaceTramStopsWithLine,
    subscriberState.user.emailDisabled,
  ]);

  // Return function and isFetching state to be used outside of custom hook
  return { isFetching, hasError };
};

export default useFetchAddServices;
