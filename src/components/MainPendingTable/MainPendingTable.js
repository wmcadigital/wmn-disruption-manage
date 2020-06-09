import React from 'react';

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

export default MainPendingTable;
