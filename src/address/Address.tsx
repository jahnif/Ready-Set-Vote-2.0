import * as React from "react";
import { RouteComponentProps } from "react-router";

import Footer from '../Footer';
import rsvLogo from "../img/rsvLogo-new.svg";
import warningImg from '../img/warning.svg';
import { addressStore } from "./AddressStore";

interface IAddressState {
  address: string;
  addressError: boolean;
}

class Address extends React.Component<RouteComponentProps, IAddressState> {
  constructor(props: any){
    super(props);

    this.state = {
      address: addressStore.address,
      addressError: false,
    };
  }

  public render() {
    return (
      <div className="start welcomeBG">
      <div />
        <div className="welcome">
          <a href="/">
            <img src={rsvLogo} alt="ReadySetVote.org" className="welcome-logo" />
          </a>	
          <div className="addressBox" style={{display: "block"}}>
            <p>Enter your street address and we'll recreate your ballot.</p>
            <form>
              <input type="text" className="myAddress" id="address" placeholder="e.g., 220 2nd Ave S, Seattle WA" value={this.state.address} onChange={this.handleChange}/>
              <div className={ this.state.addressError ? "" : "errAddressBox" }>
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
        <Footer />
      </div>
    );
  }

  private handleChange = (e: any) => {         
    this.setState({ address: e.target.value });
  };
    
  private onSubmit = (e: any) => {
    if (this.state.address && this.validateAddress(this.state.address)) {
      addressStore.setAddress(this.state.address);
      this.props.history.push(`/ballot`);
    } else {
      this.setState({ addressError: true });
      e.preventDefault();
    }
  };

  private validateAddress(address: string) { 
    // TODO: validate address using API?
    return (address.replace(/\s/g, "").length > 0);
  } 
}

export default Address;
