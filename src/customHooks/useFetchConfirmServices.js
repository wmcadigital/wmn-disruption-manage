import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SubscriberContext } from 'globalState/SubscriberContext';
import { delSearchParam } from 'helpers/URLSearchParams';

const useFetchConfirmServices = () => {
  const [subscriberState] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFinished, setIsFinished] = useState(false); // Track if fetch request is currently fetching
  const [confirmServiceIsFetching, setConfirmServiceIsFetching] = useState(false);
  const { lines, trains, trams, roads, secret, user, emailDisabled } = subscriberState.query; // Destructure state

  // Get roadlines into the right shape
  const roadLines = roads.map((road) => ({
    name: road.Name,
    distance: road.Distance,
    lat: road.Lat,
    lon: road.Lon,
  }));
  const userHasDataToConfirm = lines.length || trains.length || trams.length || roadLines.length;

  useEffect(() => {
    if (!userHasDataToConfirm || !secret || isFinished || confirmServiceIsFetching) {
      return;
    }

    setConfirmServiceIsFetching(true);
    const confirmData = {
      secret,
      emailDisabled,
    };

    if (lines.length) confirmData.lineId = lines;
    if (trains.length) confirmData.trains = trains;
    if (trams.length) confirmData.TramLines = trams;
    if (roadLines.length) confirmData.roadLines = roadLines;

    axios({
      baseURL: `${process.env.REACT_APP_API_HOST}/api`,
      url: `/personlocal/${user}`,
      method: 'PUT',
      data: JSON.stringify(confirmData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // If the response is successful(200: OK) or error with validation message(400)
        if (response.status === 200 || response.status === 400) {
          // When we have confirmed the service(s), update URL to remove lines, lnames as we don't need it anymore (stops another PUT request if user then decides to refresh page)
          delSearchParam('lines');
          delSearchParam('lnames');
          delSearchParam('trains');
          delSearchParam('tram');
          delSearchParam('road');
          delSearchParam('nomail');
          setIsFinished(true);
          return true;
        }
        throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
      })
      // If fetch is successful
      .then(() => {
        setIsFinished(true);
        setConfirmServiceIsFetching(false);
      }) // If fetch errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });

        setIsFinished(true);
        setConfirmServiceIsFetching(false);
      });
  }, [
    isFinished,
    lines,
    trains,
    trams,
    secret,
    user,
    emailDisabled,
    roadLines,
    userHasDataToConfirm,
    confirmServiceIsFetching,
  ]);

  return { confirmServiceIsFinished: isFinished };
};

export default useFetchConfirmServices;
