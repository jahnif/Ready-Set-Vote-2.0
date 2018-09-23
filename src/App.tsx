import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Address from './address/Address';
import './App.css';
import Ballot from './ballot/Ballot';
import Footer from './Footer';
import Welcome from './Welcome';

import "./css/ml.css";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={Welcome} />
          <Route path="/address" component={Address} />
          <Route path="/ballot" component={Ballot} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
