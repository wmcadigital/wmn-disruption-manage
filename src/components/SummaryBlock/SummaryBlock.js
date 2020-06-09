import React from 'react';

const SummaryBlock = () => {
  // const queryString = this._getQuery();
  // if (_.has(queryString, 'lines')) {
  //   queryString.lines = JSON.parse(atob(queryString.lines));
  // } else {
  //   queryString.lines = [];
  // }
  // if (_.has(queryString, 'lnames')) {
  //   queryString.lnames = JSON.parse(atob(queryString.lnames));
  // } else {
  //   queryString.lnames = [];
  // }
  // this.enum.deleteUrl += queryString.user;
  // this.enum.url += queryString.user;
  // this.enum.siteCode = queryString.user;

  // window
  //   .fetch(this.enum.url)
  //   .then((response) => {
  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //     return { name: '', lineId: [], newUser: true, email: '' };
  //     // throw new Error('Something went wrong');
  //   })
  //   .then(
  //     (m) => this._setData(m, queryString) // .catch((error) => {console.log(error); })
  //   );

  return (
    <div>
      <div className="wmnds-content-tile">
        {/* <p>Managing {subscriberState.query.user}&apos;s alerts about disruption</p> */}
        {/* <p>Alerts sent to {this.enum.email}</p> */}
      </div>

      {/* {this.state.MainPending && this.enum.started ? pending : null}

      {this.state.MainSubscribed && this.enum.newUser === false && this.enum.started
        ? manage
        : null}

      <div className="wmnds-content-tile">
        <h2>Add new alerts</h2>
        <p>Press the button below</p>
        <a href={signRef} className="wmnds-btn  wmnds-col-1 wmnds-col-sm-auto">
          Add alerts
        </a>
      </div>
      <div className="wmnds-content-tile">
        <h2>Unsubscribe from all alerts</h2>
        <p>You will no longer receive alerts and your data will be deleted.</p>
        <button
          onClick={this._handleClickUnsubscribe.bind(this)}
          className="wmnds-btn wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto"
        >
          Unsubscribe from all alerts
        </button>
      </div>

      {nocontent && this.enum.started} */}
    </div>
  );
};

export default SummaryBlock;
