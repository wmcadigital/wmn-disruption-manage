import React from 'react';

const AddMoreTile = () => {
  return (
    <div className="wmnds-m-t-lg wmnds-col-1">
      <div className="wmnds-content-tile">
        <h2>Add more routes</h2>
        <p>
          Subscribe to more service alerts. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.{' '}
        </p>
        <a
          href={process.env.REACT_APP_DISRUPTION_SIGN_UP_URL}
          title="Add more service routes"
          target="_self"
          className="wmnds-btn"
        >
          Add more routes
        </a>
      </div>
    </div>
  );
};

export default AddMoreTile;
