import * as React from "react";
import { RouteComponentProps } from "react-router";
import "../css/admin-dashboard.css";

import Header from "src/Header";

class Dashboard extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <Header />
        <div className="main">
          <h3>Admin Dashboard</h3>
        </div>
        <div>
          <div className="main-link-block">
            <a className="dashboard-main-links" href="">
              Geographic Voting Districts
            </a>
            <p>
              Add, Edit, and Delete the list of voting districts which you can
              later assign to Measures and Seats.
            </p>
          </div>
          <div className="main-link-block">
            <a className="dashboard-main-links" href="">
              Seats
            </a>
            <p>
              Add, Edit, and Delete the list of Seats to which you can later
              assign Candidates.
            </p>
          </div>
          <div className="main-link-block">
            <a className="dashboard-main-links" href="">
              Candidates
            </a>
            <p>
              Add, Edit, and Delete the list of Candidates running for office.
            </p>
          </div>
          <div className="main-link-block">
            <a className="dashboard-main-links" href="">
              Measures
            </a>
            <p>Add, Edit, and Delete the list of Measures.</p>
          </div>
          <div className="main-link-block">
            <a className="dashboard-main-links" href="">
              Endorsers
            </a>
            <p>
              Add, Edit, and Delete the list of Seats to which you can later
              assign Candidates.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;