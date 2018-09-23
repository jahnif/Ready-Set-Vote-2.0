import * as React from "react";
import { BallotStore } from "./BallotStore";
import EndorserTile from "./EndorserTile";

interface IProps {
  ballotStore: BallotStore;
}

class EndorserGrid extends React.Component<IProps> {
  public render() {
    const { ballotStore } = this.props;
    return (
      <div className="endorsersBG">
        <div className="endorsers">
          {ballotStore.endorsers.map(e => {
            return (
              <div key={e.endorserId}>
                <EndorserTile
                  description={e.description}
                  endorserId={e.endorserId}
                  endorserImg={e.endorserImg}
                  endorserUrl={e.endorserUrl}
                  endorserUrlText={e.endorserUrlText}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default EndorserGrid;
