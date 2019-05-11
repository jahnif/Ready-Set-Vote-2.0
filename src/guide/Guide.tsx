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
            <div className="shareurl">https://readysetvote.org/guide/CCAF3</div>
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
            <div className="step hidePrint" style={{ paddingBottom: "50px" }}>
              For over 100 years, The Municipal League has been building stronger communities by linking people to the local governments that serve them. If you want to <a href="http://www.munileague.org/support-sponsorship/" target="_blank">donate</a>, <a href="http://www.munileague.org/about/contact/" target="_blank">volunteer</a>  or just learn more, please visit <a href="http://www.munileague.org" target="_blank">munileague.org</a>.
              <p className="fineprint">Have questions about or ideas how we can improve this service? <a href="mailto:readysetvote@munileague.org?SUBJECT=Guide%20Feedback">Email us</a>!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Guide;
