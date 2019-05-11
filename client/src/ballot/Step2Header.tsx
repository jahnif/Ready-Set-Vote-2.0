import * as React from "react";

class Step2Header extends React.Component {
  public render() {
    return (
      <div className="main">
        <div className="step">
          <span>Step 2:</span> Pick the candidates and measures you support! The
          Municipal League ratings and recommendations are included to help
          inform your vote.
          <p>
            Please note that we've only included school board races and special
            purpose district races that have at least one endorsement.
          </p>
          <p>
            And your ballot guide is personal and private. It does not count as
            your final vote on election day.
          </p>
        </div>
      </div>
    );
  }
}

export default Step2Header;
