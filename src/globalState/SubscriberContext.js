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
      secret: '',
      user: getSearchParam('user') || '',
    },
    user: {},
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the favState depening on action type
    console.log({ action });
    switch (action.type) {
      // Add favourite
      case 'MAP_USER_DETAILS':
        return {
          ...state,
          user: action.payload,
        };
      // Remove favourite
      case 'REMOVE_FAV':
        return {
          ...state,
          bus: state.bus.filter((item) => item !== action.id),
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
