import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchUser = () => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const [isFetching, setIsFetching] = useState(false); // Track if fetch request is currently fetching

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}api/person/${subscriberState.query.user}`)
      .then((response) => {
        // If the response is successful(200: OK) or error with validation message(400)
        if (response.status === 200 || response.status === 400) {
          return response.json(); // Return response as json
        }
        throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
      })
      // If fetch is successful
      .then((payload) => {
        console.log({ payload });
        subscriberDispatch({ type: 'MAP_USER_DETAILS', payload });
        // subscriberDispatch({
        //   type: 'MAP_USER_DETAILS',
        //   payload: {
        //     name: '',
        //     email: '',
        //     lineId: [{ id: '1234', idName: 'hello', name: '77' }],
        //     newUser: false,
        //     updates: null,
        //   },
        // });
        setIsFetching(false); // set to false as we are done fetching now
      }) // If fetch errors
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error({ error });

        setIsFetching(false); // set to false as we are done fetching now
      });
  }, [subscriberDispatch, subscriberState.query.user]);
};

export default useFetchUser;
