import React from '../oldsrc/react';

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

export default SubscribedTable;
