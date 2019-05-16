import * as React from "react";
import { RouteComponentProps } from "react-router";
import Footer from '../Footer';
import warningImg from '../img/warning.svg';

interface IGetEmailState {
  email: string;
  emailError: boolean;
}

class GetEmail extends React.Component<RouteComponentProps, IGetEmailState> {
  constructor(props: any){
    super(props);

    this.state = {
      email: '',
      emailError: false,
    };
  }

  public render() {
    return (
      <div className="email">
        <div className="step-email">
          <h3>Keep in Touch</h3>
          <p>
            Like this tool? Keep in touch with the Municipal League for the
            latest endorsement updates, voting resources, and ways to get
            involved!
          </p>
          <p className="yes">
            Yes, I want to be informed of new endorsements and other election
            information.
          </p>
          <form>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email Address"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div className="email-disclaimer">
              Your email will never be shared or sold to an outside party.
            </div>
            <div className={ this.state.emailError ? "" : "errAddressBox" }>
              <div id="errAddress">
                <img src={warningImg} width="30" height="30" style={{display: "inline-block", margin: "0em 1em 0em 0em"}} />
                Please enter a valid email address.
              </div>
            </div>
            <button className="email-submit" onClick={ this.onSubmit }>
              Show me my Ballot Guide
            </button>
          </form>
          <span className="email-nothanks">
            No thank you,{" "}
            <a href="/guide/CCAF3">take me straight to my ballot guide</a>
          </span>
        </div>
        <Footer />
      </div>
    );
  }
  
  private handleChange = (e: any) => {      
    this.setState({ email: e.target.value });
  };
    
  private onSubmit = (e: any) => {
    if (this.state.email && this.validateEmail(this.state.email)) {
      this.props.history.push(`/guide/CCAF3`);
    } else {
      this.setState({ emailError: true });
      e.preventDefault();
    }
  };

  private validateEmail(email: string) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  } 
}

export default GetEmail;
