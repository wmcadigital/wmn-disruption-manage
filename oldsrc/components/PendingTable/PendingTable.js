import React from '../oldsrc/react';

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

export default PendingTable;
