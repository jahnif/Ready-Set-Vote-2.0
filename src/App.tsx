import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Address from "./address/Address";
import Dashboard from "./admin/Dashboard";
import "./App.css";
import Ballot from "./ballot/Ballot";
import "./css/ml.css";
import Footer from "./Footer";
import GetEmail from "./getEmail/GetEmail";
import Guide from "./guide/Guide";
import Welcome from "./welcome/Welcome";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={Welcome} />
          <Route path="/address" component={Address} />
          <Route path="/ballot" component={Ballot} />
          <Route path="/email" component={GetEmail} />
          <Route path="/guide" component={Guide} />
          {/* this should route to an admin login instead of the dashboard */}
          <Route path="/admin" component={Dashboard} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
