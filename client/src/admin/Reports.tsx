import * as React from 'react';

class Reports extends React.Component {

  public render() {

    // TODO: functionality for rendering ballots and link mailto- email addresses

    return(
      <div className="dashboard-right">
        <div className="dashboard-item">Reports</div>
        <div className="instructions">434 total ballots</div>
        <div className="instructions email-addresses">143 Email Addresses available for download</div>
      </div>
    )
  }

}

export default Reports;