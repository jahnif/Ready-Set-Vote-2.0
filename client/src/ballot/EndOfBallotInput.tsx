import * as React from "react";

class EndOfBallotInput extends React.Component {
  public render() {
    return (
      <div className="step">
        <h3>Congratulations!</h3>
        <div className="finish">
          Your ballot guide is complete! Click continue to view your
          personalized guide!
        </div>
        <a href="/email/SEA37-1935/33/9/37" className="continue">
          Continue
        </a>
        <a href="#theTop" className="startover">
          Start Over
        </a>
        <p className="fineprint">
          Have questions about or ideas how we can improve this service?{" "}
          <a href="mailto:readysetvote@munileague.org?SUBJECT=Guide%20Feedback">
            Email us
          </a>
          !
        </p>
        <hr className="rule" />
      </div>
    );
  }
}

export default EndOfBallotInput;
