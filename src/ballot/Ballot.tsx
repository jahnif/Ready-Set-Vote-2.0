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
    demoEndorser.description = "The Seattle Times provides local news, sports, business, politics, entertainment, travel, restaurants and opinion for Seattle and the Pacific Northwest";
    demoEndorser.endorserId = "1234";
    demoEndorser.endorserImg = "";
    demoEndorser.endorserUrl = "https://www.seattletimes.com/opinion/the-seattle-times-endorsements-for-the-november-7-2017-election/";
    demoEndorser.endorserUrlText = "seattletimes.com";
    demoEndorser.selected = true;
    ballotStore.addEndorser(demoEndorser);
    const demoEndorser2 = new EndorserStore();
    demoEndorser2.description = "The Stranger is Seattle's free weekly alternative arts and culture newspaper";
    demoEndorser2.endorserId = "5678";
    demoEndorser2.endorserImg = "";
    demoEndorser2.endorserUrl = "http://thestranger.com/features/2017/10/11/25459963/the-strangers-endorsements-for-the-november-7-2017-general-election";
    demoEndorser2.endorserUrlText = "thestranger.com";
    demoEndorser2.selected = true;
    ballotStore.addEndorser(demoEndorser2);

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
