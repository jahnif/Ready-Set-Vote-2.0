import * as React from "react";
import {BallotStore} from "./BallotStore";

interface IProps {
  ballotStore: BallotStore
}

class EndorserFilterBar extends React.Component<IProps> {
  public render() {
    const { ballotStore } = this.props
    return (
      <div
        id="sticky-wrapper"
        className="sticky-wrapper"
        style={{ height: "52px" }}
      >
        <div className="endorsers-countBG">
          <div className="endorsers-count">
            <div>
              Organizations:{" "}
              <strong>
                <span>{ballotStore.endorsersSelectedString}</span>
              </strong>
            </div>
            <div className="select-all" id="pick">
              Select <span id="none-or-all">None</span>
            </div>
            <a href="#step1" className="select-all" id="change">
              Change Organizations
            </a>
          </div>
          <div className="progressContainer">
            <div id="progress" className="progress" style={{ width: "1%" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default EndorserFilterBar;
