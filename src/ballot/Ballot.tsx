import * as React from "react";

import Header from "../Header";
import appleby from "../img/candidates/appleby.jpg";
import { ballotStore } from "./BallotStore";
import Candidate from "./Candidate";
import DistrictHeader from "./DistrictHeader";
import EndOfBallotInput from "./EndOfBallotInput";
import EndorserGrid from "./EndorserGrid";
import { EndorserStore } from "./EndorserStore";
import RaceHeader from "./RaceHeader";
import Sponsors from "./Sponsors";
import Step1Header from "./Step1Header";
import Step2Header from "./Step2Header";

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

    const demoEndorser = new EndorserStore(
      "The Seattle Times provides local news, sports, business, politics, entertainment, travel, restaurants and opinion for Seattle and the Pacific Northwest",
      "1234", "favicon.ico",
      "https://www.seattletimes.com/opinion/the-seattle-times-endorsements-for-the-november-7-2017-election/",
      "seattletimes.com"
    );
    ballotStore.addEndorser(demoEndorser);
    const demoEndorser2 = new EndorserStore(
      "The Stranger is Seattle's free weekly alternative arts and culture newspaper",
      "5678", "favicon.ico",
      "http://thestranger.com/features/2017/10/11/25459963/the-strangers-endorsements-for-the-november-7-2017-general-election",
      "thestranger.com"
    );
    ballotStore.addEndorser(demoEndorser2);

    return (
      <div>
        <Header />
        <Step1Header />
        <EndorserGrid ballotStore={ballotStore} />

        <Step2Header />
        <DistrictHeader districtName="Test District" />
        <RaceHeader raceName="Test Race" />
        <div className="seats">
          <Candidate candidate={demoCandidate} />
        </div>

        <EndOfBallotInput />

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
