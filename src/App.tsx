import * as React from 'react';
import './App.css';
import CallToAction from './CallToAction';
import Footer from './Footer';

import './css/ml.css';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React </h1>
        </header>
          <CallToAction />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Footer />
      </div>
    );
  }
}

export default App;
