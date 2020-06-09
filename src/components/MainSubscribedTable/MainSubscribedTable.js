import React from 'react';

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

export default MainSubscribedTable;
