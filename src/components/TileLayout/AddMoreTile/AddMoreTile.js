import React from 'react';

const AddMoreTile = () => {
  return (
    <div className="wmnds-content-tile wmnds-col-1 wmnds-m-t-lg">
      <h2>Add more services</h2>
      <p>
        Subscribe to more service alerts. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.{' '}
      </p>
      <a
        href={process.env.REACT_APP_DISRUPTION_SIGN_UP_URL}
        title="Add more service services"
        target="_self"
        className="wmnds-btn"
      >
        Add more services
      </a>
    </div>
  );
};

export default AddMoreTile;
