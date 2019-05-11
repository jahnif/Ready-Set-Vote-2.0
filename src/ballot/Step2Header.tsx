import * as React from "react";

class Step2Header extends React.Component {
  public render() {
    return (
      <div className="main">
        <div className="step">
          <span>Step 2:</span> Pick the candidates and measures you support!
          <p>
            Your ballot guide is personal and private. It does not count as
            your final vote on election day.
          </p>
        </div>
      </div>
    );
  }
}

export default Step2Header;
