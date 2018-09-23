import * as React from "react";

class Header extends React.Component {
  public render() {
    return (
      <header id="theTop">
        <a href="/" className="header-logo">
          ReadySetVote
          <span>.ORG</span>
        </a>
        <div className="mlProject">
          A Project of the{" "}
          <a href="http://munileague.org" target="_blank">
            Municipal League
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
