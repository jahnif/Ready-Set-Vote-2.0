import * as React from "react";
import { RouteComponentProps } from "react-router";
import Header from "../Header";

class Guide extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <Header />
        <div className="main hidePrint">
          <div className="step guide">
            <h3>Congratulations, you've finished your ballot guide!</h3>
            Now that you've chosen how you'll vote, you can print, save or share
            this page.
            <div className="shareurl-label">Your unique ballot guide URL:</div>
            <input
              type="text"
              className="shareurl"
              value="https://readysetvote.org/guide/CCAF3"
            />
            <p className="shareurl-fineprint">
              Save this private link to return to your ballot guide.
            </p>
            <div className="shareurl-shares">
              <strong style={{ color: "#000" }}>Share: </strong>
              <a href="#0" className="facebookShareLink">
                Facebook
              </a>
              <a href="#0" className="twitterShareLink">
                Twitter
              </a>
              <a href="#0">Print</a>
              <a href="/ballot/SEA37-1935/9/37">Start Over</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Guide;
