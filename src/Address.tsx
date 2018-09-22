import * as React from "react";
import { RouteComponentProps } from "react-router";
import { addressStore } from "./AddressStore";
import "./App.css";
import rsvLogo from "./img/rsvLogo-new.svg";
import warningImg from './img/warning.svg';

class Address extends React.Component<RouteComponentProps> {
  private addressStore = addressStore;

  public render() {
    return (
      <div className="start welcomeBG">
      <div />
        <div className="welcome">
          <a href="/">
            <img src={rsvLogo} alt="ReadySetVote.org" className="welcome-logo" />
          </a>	
          <div className="addressBox" style={{display: "block"}}>
            <p>Enter your King County street address and we'll recreate your ballot.</p>
            <form>
              <input type="text" className="myAddress" id="address" placeholder="e.g., 220 2nd Ave S, Seattle WA" value={this.addressStore.address}/>
              <div className="errAddressBox">
                <div id="errAddress">
                  <img src={warningImg} width="30" height="30" style={{display: "inline-block", margin: "0em 1em 0em 0em"}} />
                  Invalid street address.
                </div>
              </div>
              <button className="address-submit" onClick={this.onSubmit}>Continue</button>
            </form>
            <p className="fineprint">Addresses are used only for locating voting districts.</p>
            <p className="fineprint">
              Have questions about or ideas how we can improve this service? <a href="mailto:readysetvote@munileague.org?SUBJECT=Address%20Feedback">Email us</a>!
            </p>
          </div>
        </div>
      </div>
    );
  }
    
  private onSubmit = () => {
    this.props.history.push(`/ballot`);
  }
}

export default Address;
