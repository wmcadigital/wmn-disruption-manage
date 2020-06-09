import React from 'react';
import './App.css';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

const _ = require('underscore');

class SubscribedTable extends React.Component {
  _handleClick(e) {
    e.preventDefault();
    this.props.handleclick(e.target.id);
  }

  render() {
    const routeNames = this.props.name.split('-').map((m) => m.trim());
    const [stopName, routeName, lineId] = routeNames;
    const buttonStyle = this.props.clicked
      ? 'wmnds-btn  wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto'
      : 'wmnds-btn wmnds-btn--start wmnds-col-1 wmnds-col-sm-auto';

    const stopDetail = (
      <td>
        <li className="wmnds-content-tile__list--li">
          <div className="wmnds-col-auto">
            <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium">
              {stopName}
            </div>
          </div>
          <p className="wmnds-disruption-indicator-large__text">
            <strong>{routeName}</strong>
            <br />
            including return journey
          </p>
        </li>
      </td>
    );

    const button = (
      <button onClick={this._handleClick.bind(this)} id={this.props.idx} className={buttonStyle}>
        {this.props.btntype}
      </button>
    );

    return (
      <tr className={this.props.clicked && this.props.idx !== 'deleteselected' ? 'striked' : ''}>
        <td>{this.props.idx === 'deleteselected' ? button : stopDetail}</td>
        <td>{this.props.idx === 'deleteselected' ? null : button}</td>
      </tr>
    );
  }
}

class MainSubscribedTable extends React.Component {
  _handleClick(e) {
    this.props.handlesubclick(e);
  }

  _getData() {
    return this.props.getsubdata();
  }

  _getSunscribed() {
    const data = this._getData();
    return data.map((m) => (
      <SubscribedTable
        name={m.name}
        idx={m.idx}
        clicked={m.clicked}
        btntype={m.btnType}
        handleclick={this._handleClick.bind(this)}
        key={m.idx}
      />
    ));
  }

  render() {
    const tables = this._getSunscribed();
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{tables}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class PendingTable extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <li className="wmnds-content-tile__list--li">
            <div className="wmnds-col-auto">
              <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium">
                {this.props.name}
              </div>
            </div>
            <p className="wmnds-disruption-indicator-large__text">
              <strong>{this.props.idName}</strong>
              <br />
              including return journey
            </p>
          </li>
        </td>
      </tr>
    );
  }
}

class MainPendingTable extends React.Component {
  _getData() {
    return this.props.getpendata();
  }

  _getTable(lines) {
    return lines.map((m) => <PendingTable name={m.Name} idName={m.IdName} key={m.Id} />);
  }

  _handleClick() {
    this.props.processpending();
  }

  render() {
    const data = this._getData();
    const { lines, secret, user, lnames } = data;
    const table = this._getTable(lnames);

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th />
              </tr>
            </thead>
            <tbody>
              {table}
              <tr>
                <td>
                  <button
                    className="wmnds-btn wmnds-btn--start wmnds-col-1 wmnds-col-sm-auto"
                    onClick={this._handleClick.bind(this)}
                  >
                    Confirm your routes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const baseUrl = this.props.appConfig.live; // live or test
    this.state = {
      MainSubscribed: 1,
      MainPending: 1,
      data: [],
      query: {
        lines: [],
        secret: '',
        user: '',
        lnames: [],
      },
    };
    this.enum = {
      deleteUrl: `${baseUrl}api/person/`,
      url: `${baseUrl}api/person/`,
      uSub: `${baseUrl}api/removeme/`,
      signUpUrl: this.props.appConfig.signUp,
      // deleteUrl: "https://disruptionsuk.azurewebsites.net/api/person/",
      // url: "https://rtccdisruptions6zqwajo6s.azurewebsites.net/api/person/",
      release: true,
      query: {
        lines: [],
        secret: '',
        user: '',
      },
      name: '',
      updates: 0,
      newUser: false,
      started: false,
      email: '',
      siteCode: '',
      delButtonTxt: 'Select',
      delButtonSelectTxt: 'Remove Selected',
    };
  }

  // componentDidMount() {
  //   this.enum.started = true;
  //   const queryString = this._getQuery();
  //   if (_.has(queryString, 'lines')) {
  //     queryString.lines = JSON.parse(atob(queryString.lines));
  //   } else {
  //     queryString.lines = [];
  //   }
  //   if (_.has(queryString, 'lnames')) {
  //     queryString.lnames = JSON.parse(atob(queryString.lnames));
  //   } else {
  //     queryString.lnames = [];
  //   }
  //   this.enum.deleteUrl += queryString.user;
  //   this.enum.url += queryString.user;
  //   this.enum.siteCode = queryString.user;

  //   window
  //     .fetch(this.enum.url)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //       return { name: '', lineId: [], newUser: true, email: '' };
  //       // throw new Error('Something went wrong');
  //     })
  //     .then(
  //       (m) => this._setData(m, queryString) // .catch((error) => {console.log(error); })
  //     );
  // }

  _handleClickUnsubscribe(e) {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure you want to remove all of your data from our system?'
    );
    if (confirm) {
      this._unsubscribeUser().then((m) => console.log(m));
    }
  }

  _unsubscribeUser() {
    const { siteCode, uSub } = this.enum;
    const data = { name: siteCode };
    const url = uSub + siteCode;
    return window
      .fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'DELETE', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then((response) => response.json());
  }

  _setData(data, queryString) {
    this.enum.name = data.name;
    this.enum.updates = data.updates;
    this.enum.newUser = data.newUser;
    this.enum.email = data.email;
    // this.props.user.innerHTML = " " + data.name; not required here
    const result = this._convertLine(data.lineId);
    result.push({
      name: '',
      idx: 'deleteselected',
      btnType: this.enum.delButtonSelectTxt,
      clicked: false,
    });
    this.setState({
      data: result,
      MainSubscribed: data.lineId.length,
      query: queryString,
      MainPending: queryString.lines.length,
    });
  }

  _convertLine(lines) {
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      const item = `${lines[i].name} - ${lines[i].idName} - LineId: ${lines[i].id}`;
      const idx = `${lines[i].id}`;
      result.push({
        name: item,
        idx,
        btnType: this.enum.delButtonTxt,
        clicked: false,
      });
    }
    return result;
  }

  _convertLinePending(lines) {
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      const item = `${lines[i].Name} - ${lines[i].IdName} - LineId: ${lines[i].Id}`;
      const idx = `${lines[i].Id}`;
      result.push({
        name: item,
        idx,
        btnType: this.enum.delButtonTxt,
        clicked: false,
      });
    }
    return result;
  }

  _getQuery() {
    const strUrl = window.location.search;
    const result = {};
    const qs = strUrl.substring(strUrl.indexOf('?') + 1).split('&');
    qs.forEach((item) => {
      const pairs = item.split('=');
      result[pairs[0]] = decodeURIComponent(pairs[1]);
    });
    return result;
  }

  _handleSubClick(e) {
    if (e === 'deleteselected') {
      const data = [...this.state.data];
      const lastIndex = data.length - 1;
      if (data[lastIndex].clicked === false) {
        return;
      }
      const items = data.filter((m) => m.clicked === true && m.idx !== 'deleteselected');
      const lineId = _.pluck(items, 'idx');
      const secret = 'Hello World';
      if (this.enum.release) {
        this._deleteSubStops({ lineId, secret });
      }
      const difference = _.difference(data, items);
      data[lastIndex].clicked = false;
      this.setState({
        data: difference,
        MainSubscribed: difference.length - 1,
      });
    } else {
      const data = [...this.state.data];
      const lastIndex = data.length - 1;
      const item = _.find(data, function (ex) {
        return ex.idx === e;
      });
      item.clicked = !item.clicked;
      const anyClicked = _.find(data, function (ex) {
        return ex.clicked === true && ex.idx !== 'deleteselected';
      });
      data[lastIndex].clicked = !!anyClicked;
      this.setState({ data });
    }
  }

  _deleteSubStops(response) {
    window
      .fetch(this.enum.deleteUrl, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(response),
      })
      .then((res) => res.text()) // OR res.json()
      .then((res) => console.log(res));
  }

  _handleSubData() {
    return this.state.data;
  }

  _getHeaderT() {
    return (
      <MainSubscribedTable
        handlesubclick={this._handleSubClick.bind(this)}
        getsubdata={this._handleSubData.bind(this)}
      />
    );
  }

  _getPendingT() {
    return (
      <MainPendingTable
        getpendata={this._handlePenData.bind(this)}
        processpending={this._handlePending.bind(this)}
      />
    );
  }

  _handlePenData() {
    return { ...this.state.query };
  }

  _handlePending() {
    this._acceptPending();
  }

  _acceptPending() {
    const url = this.enum.deleteUrl;
    const { secret } = this.state.query;
    const queryData = this.state.query.lines;
    const { lnames } = this.state.query;
    const currentData = [...this.state.data];
    const currentLines = _.pluck(currentData, 'idx');
    const diff = _.difference(queryData, currentLines);
    const fullLines = this._pairTogether(diff, lnames);

    if (fullLines.length > 0) {
      this._appendLines(fullLines, currentData);
    } else {
      this.setState({ query: this.enum.query, MainPending: 0 });
    }
    if (this.enum.release && fullLines.length > 0) {
      this._putRequest(url, { lineId: queryData, secret })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }

  _pairTogether(diff, lnames) {
    const result = [];
    for (let i = 0; i < diff.length; i++) {
      const item = diff[i];
      const first = _.findWhere(lnames, { Id: item });
      if (first) {
        result.push(first);
      }
    }
    return result;
  }

  _appendLines(diff, currentData) {
    const toAdd = this._convertLinePending(diff); // TODO remove duplicate method
    for (let i = 0; i < toAdd.length; i++) {
      const item = toAdd[i];
      const index = currentData.length - 1;
      currentData.splice(index, 0, item);
    }
    this.enum.newUser = false;
    this.setState({
      query: this.enum.query,
      MainPending: 0,
      data: currentData,
      MainSubscribed: currentData.length - 1,
    });
  }

  _putRequest(url, data) {
    return window
      .fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then((response) => response.json());
  }

  render() {
    const mainsubT = this._getHeaderT();

    const mainpenT = this._getPendingT();
    const nocontent =
      this.state.MainPending === 0 && this.state.MainSubscribed === 0 ? (
        <h3 style={{ color: 'red' }}>
          <p>You have 0 pending and 0 registered lines.</p>
          <p>
            Click <a href="#">here</a> to add something
          </p>
        </h3>
      ) : null;
    const name = window.encodeURI(this.enum.name);
    const email = window.encodeURI(this.enum.email);
    const signRef = `${this.enum.signUpUrl}?name=${name}&email=${email}`;
    const pending = (
      <div className="wmnds-content-tile">
        <a id="confirm" />
        <h2>Confirm your routes</h2>
        <div className="wmnds-msg-help">
          Confirm services that you signed up for. If you do not confirm, services will expire by
          midnight.
        </div>
        <hr />
        <h3>Bus routes added</h3>
        {this.state.MainPending && this.enum.started ? mainpenT : null}
      </div>
    );

    const manage = (
      <div className="wmnds-content-tile">
        <a id="remove" />
        <h2>Manage your routes</h2>
        <div className="wmnds-msg-help">
          Select services you want to remove from your email alerts list.
        </div>
        <hr />
        <h3>Bus routed added</h3>
        {this.state.MainSubscribed && this.enum.newUser === false && this.enum.started
          ? mainsubT
          : null}
      </div>
    );

    return (
      <div>
        <div className="wmnds-content-tile">
          <p>Managing {this.enum.name}'s alerts about disruption</p>
          <p>Alerts sent to {this.enum.email}</p>
        </div>

        {this.state.MainPending && this.enum.started ? pending : null}

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

        {nocontent && this.enum.started}
      </div>
    );
  }
}

export default App;
