import * as React from "react";

class Step1Header extends React.Component {
  public render() {
    return (
      <div className="main">
        <h3>Your Ballot Guide.</h3>
        <div className="step" id="step1">
          <span>Step 1:</span> We'll show you endorsements from these trusted organizations on your ballot below. Uncheck the ones you don't want to see.
        </div>
      </div>
    );
  }
}

export default Step1Header;
