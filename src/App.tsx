import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Address from './address/Address';
import Admin from './admin/Admin';
import EditTable from './admin/EditTable'
import MyAdmin from './admin/MyAdmin';
import './App.css';
import Ballot from './ballot/Ballot';
import "./css/ml.css";
import GetEmail from "./getEmail/GetEmail";
import Guide from "./guide/Guide";
import Welcome from './welcome/Welcome';

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
          <Route path="/myadmin" component={MyAdmin} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/*" component={EditTable} />
        </div>
      </Router>
    );
  }
}

export default App;
