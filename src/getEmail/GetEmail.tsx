import * as React from "react";
import { RouteComponentProps } from "react-router";

class GetEmail extends React.Component<RouteComponentProps> {
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
            />
            <div className="email-disclaimer">
              Your email will never be shared or sold to an outside party.
            </div>
            <div className="errAddressBox">
              <div id="errAddress">
                <img
                  src="/img/warning.svg"
                  width="30"
                  height="30"
                  style={{ display: "inline-block", marginRight: "1em" }}
                />
                Please enter a valid email address.
              </div>
            </div>
            <button type="submit" className="email-submit">
              Show me my Ballot Guide
            </button>
          </form>
          <span className="email-nothanks">
            No thank you,{" "}
            <a href="/guide/CCAF3">take me straight to my ballot guide</a>
          </span>
        </div>
      </div>
    );
  }
}

export default GetEmail;
