import { useContext, useState, useEffect, useCallback } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
import useSelectableTramLines from 'customHooks/useSelectableTramLines';

const useFetchAddServices = (selectedServices, resend) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching
  const [hasError, setHasError] = useState(null);

  // Fetching functions
  const checkResponseStatus = (response) => {
    // If the response is successful(200: OK) or error with validation message(400)
    if (response.status === 200 || response.status === 400) {
      return response.text(); // Return response as json
    }
    throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
  };

  const catchErrors = (error) => {
    // eslint-disable-next-line no-console
    console.error({ error });

    setIsFetching(false); // set to false as we are done fetching now
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

    return fetch(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`, {
      method: 'DELETE',
      body: JSON.stringify(dataToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkResponseStatus)
      .catch(catchErrors);
  }, [
    filterTramLineInfo,
    shouldReplaceTramLineWithStops,
    shouldReplaceTramStopsWithLine,
    subscriberState.query,
    subscriberState.user.lineId,
    subscriberState.user.tramLines,
  ]);

  const addServices = useCallback(
    (data) => {
      return (
        fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${subscriberState.query.user}`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(checkResponseStatus)
          // If fetch is successful
          .then((payload) => {
            setIsFetching(false); // set to false as we are done fetching now
            setHasError(false);
            subscriberDispatch({ type: 'MAP_USER_DETAILS', payload: JSON.parse(payload) }); // Map user details to state
          }) // If fetch errors
          .catch(catchErrors)
      );
    },
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
