import * as React from "react";
import { BallotStore } from "../BallotStore";
import EndorserStatusBar from "./EndorserStatusBar";
import EndorserTile from "./EndorserTile";

interface IProps {
  ballotStore: BallotStore;
}

class EndorserGrid extends React.Component<IProps> {
  public render() {
    const { ballotStore } = this.props;
    return (
      <React.Fragment>
        <EndorserStatusBar ballotStore={ballotStore} />
        <div className="endorsersBG">
          <div className="endorsers">
            {ballotStore.endorsers.map(e => {
              return (
                <EndorserTile key={e.endorserId} endorserStore={e} />
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EndorserGrid;
