import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchReplacePhone = (mobileNumber) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;
  console.log("replacing...");

  useEffect(() => {
    if (mobileNumber && user) {
        console.log("replacing... now...");
      fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
        method: 'DELETE',
        body: JSON.stringify({
          RemoveMobile: 'anytext',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            return response.text(); // Return response as json
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        // If fetch is successful
        .then((payload) => {
          // if (payload === 'deleted')
          console.log(payload);
          console.log('is deleted....');

          fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${user}`, {
            method: 'PUT',
            body: JSON.stringify({
              mobileNumber,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              // If the response is successful(200: OK) or error with validation message(400)
              if (response.status === 200 || response.status === 400) {
                return response.text(); // Return response as json
              }
              throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
            })
            // If fetch is successful
            .then((test) => {
              // if (payload === 'deleted')
              console.log(test);
              console.log('is saving new number....');
            }) // If fetch errors
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error({ error });
              console.log("it's not saving new number....");
            });
        }) // If fetch errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          console.log("it's not deleted....");
        });
    }
  }, [mobileNumber, user]);
};

export default useFetchReplacePhone;

/* import { useContext, useState, useEffect } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';

const useFetchReplacePhone = (mobileNumber) => {
  const [subscriberState, subscriberDispatch] = useContext(SubscriberContext); // Get the state/dispatch of subscriber/user from SubscriberContext
  const { user } = subscriberState.query;
  const [recentInfo, setRecentInfo] = useState([]);
  const [allTimeInfo, setAllTimeInfo] = useState([]);

  useEffect(() => {
    if (mobileNumber && user) {
        console.log("inside");
      Promise.all([
        fetch(`${process.env.REACT_APP_API_HOST}api/person/${user}`, {
          method: 'DELETE',
          body: JSON.stringify({
            RemoveMobile: '',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${process.env.REACT_APP_API_HOST}api/personlocal/${user}`, {
          method: 'PUT',
          body: JSON.stringify({
            mobileNumber,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
          setRecentInfo(data1);
          setAllTimeInfo(data2);
        });
    }
  }, [mobileNumber, user]);

  console.log(allTimeInfo);
  console.log(recentInfo);

}


export default useFetchReplacePhone;
 */
