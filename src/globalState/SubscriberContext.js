import React, { useReducer, createContext } from 'react';
import { getSearchParam } from 'helpers/URLSearchParams';

export const SubscriberContext = createContext(); // Create when context

export const SubscriberProvider = (props) => {
  const { children } = props || {};

  // Set intial state of favs (get from localStorage OR set default)
  const initialState = {
    name: '',
    query: {
      lines: getSearchParam('lines') ? JSON.parse(atob(getSearchParam('lines'))) : [],
      lnames: getSearchParam('lnames') ? JSON.parse(atob(getSearchParam('lnames'))) : [],
      secret: getSearchParam('secret') || '',
      user: getSearchParam('user') || '',
      mobileNumber: getSearchParam('mobi') || '',
      emailDisabled: getSearchParam('nomail') || '',
      trains: getSearchParam('trains') ? JSON.parse(atob(getSearchParam('trains'))) : [],
    },
    user: {
      name: '',
      email: '',
      lineId: [],
      newUser: false,
      updates: null,
      emailDisabled: null,
      trains: [],
      tramLines: [],
    },
    addServices: [],
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the state depening on action type
    switch (action.type) {
      // Add favourite
      case 'MAP_USER_DETAILS':
        return {
          ...state,
          user: action.payload,
        };
      // Remove line id from state when deleted via API call
      case 'REMOVE_LINE_ID':
        return {
          ...state,
          user: {
            ...state.user,
            lineId: state.user.lineId.filter((x) => x.id !== action.payload),
          },
        };
      // Remove train line from state when deleted via API call
      case 'REMOVE_TRAIN_LINE':
        return {
          ...state,
          user: {
            ...state.user,
            trainLines: state.user.trainLines.filter((x) => x !== action.payload),
          },
        };
      // Remove tram line from state when deleted via API call
      case 'REMOVE_TRAM_LINE':
        return {
          ...state,
          user: {
            ...state.user,
            tramLines: state.user.tramLines.filter(
              (tram) => tram.from !== action.payload.from || tram.to !== action.payload.to
            ),
          },
        };
      case 'REMOVE_MOBILE':
        return {
          ...state,
          user: {
            ...state.user,
            mobileNumber: action.payload,
            mobileActive: false,
          },
        };

      case 'ADD_PIN_CONFIRMATION_MESSAGE':
        return {
          ...state,
          user: {
            ...state.user,
            smsMessageSuccess: action.payload,
          },
        };

      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [subscriberState, subscriberDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <SubscriberContext.Provider value={[subscriberState, subscriberDispatch]}>
      {children}
    </SubscriberContext.Provider>
  );
};
