import * as React from "react";

import Header from "../Header";
import appleby from "../img/candidates/appleby.jpg";
import { ballotStore } from "./BallotStore";
import Candidate from "./Candidate";
import DistrictHeader from "./DistrictHeader";
import EndorserFilterBar from "./EndorserFilterBar";
import EndorserGrid from "./EndorserGrid";
import { EndorserStore } from "./EndorserStore";
import RaceHeader from "./RaceHeader";
import Sponsors from "./Sponsors";
import Step1Header from "./Step1Header";

class Ballot extends React.Component {
  public render() {
    const demoCandidate = {
      candidateId: "testId",
      candidateName: "Marty McPolitican",
      candidateUrl: "http://www.google.com",
      candidateUrlText: "My super cool website",
      imgSrc: appleby,
      municipalLeagueRating: "Amazinggggggggg",
      party: "PARTYYY",
      userNames: "What goes here"
    };

    const demoEndorser = new EndorserStore();
    demoEndorser.description = "The Seattle Times";
    demoEndorser.endorserId = "1234";
    demoEndorser.endorserImg = "";
    demoEndorser.endorserUrl = "http://www.google.com";
    demoEndorser.endorserUrlText = "The Seattle Times";
    demoEndorser.selected = false;
    ballotStore.addEndorser(demoEndorser);

    return (
      <div>
        <Header />
        <Step1Header />
        <EndorserFilterBar ballotStore={ballotStore}/>
        <EndorserGrid ballotStore={ballotStore} />

        <DistrictHeader districtName="Test District" />
        <RaceHeader raceName="Test Race" />
        <div className="seats">
          <Candidate candidate={demoCandidate} />
        </div>
        <Sponsors
          sponsors={[
            {
              altText: "Seattle Seahawks",
              imgSrc: "https://readysetvote.org/img/sponsor_seahawks.gif"
            }
          ]}
        />
      </div>
    );
  }
}

export default Ballot;
