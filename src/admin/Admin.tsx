import * as React from "react";
import "../css/admin.css";

import Endorsements from './Endorsements';
import Links from './Links';
import Reports from './Reports';


class Admin extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div className="top-line" />
          {/* TODO: import pictures, like torch logo, from old code */}
          <div className="admin-dash">
          <div className="logoTop" /> 
          <div className="dashboard">
            <div className="dashboard-left">
              <Links />
            </div>
            <div className="dasboard-right">
              <Endorsements />
              <Reports />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;