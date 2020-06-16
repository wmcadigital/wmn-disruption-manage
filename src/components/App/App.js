import React from 'react';
import { SubscriberProvider } from 'globalState/SubscriberContext';

// Components
import TileLayout from 'components/TileLayout/TileLayout';

const App = () => {
  return (
    <React.StrictMode>
      <SubscriberProvider>
        <TileLayout />
      </SubscriberProvider>
    </React.StrictMode>
  );
};

export default App;
