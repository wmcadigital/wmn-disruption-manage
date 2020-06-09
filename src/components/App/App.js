import React from 'react';
import { SubscriberProvider } from 'globalState/SubscriberContext';
// Import components
import SummaryBlock from 'components/SummaryBlock/SummaryBlock';

const App = () => {
  return (
    <React.StrictMode>
      <SubscriberProvider>
        <div className="wmnds-col-1 wmnds-col-md-3-5">
          <SummaryBlock />
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-5">side</div>
      </SubscriberProvider>
    </React.StrictMode>
  );
};

export default App;
