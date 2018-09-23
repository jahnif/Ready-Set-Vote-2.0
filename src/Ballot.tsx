import * as React from "react";
import "./App.css";

import Candidate from "./Candidate";
import DistrictHeader from "./DistrictHeader";
import Endorser from "./Endorser";
import Header from "./Header";
import appleby from "./img/candidates/appleby.jpg";
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

    return (
      <div>
        <Header />
        <Step1Header />
        <div className="endorsersBG">
          <div className="endorsers">
            <Endorser
              description="The Seattle Times"
              endorserId="1234"
              endorserImg=""
              endorserUrl="http://www.google.com"
              endorserUrlText="The Seattle Times"
            />
          </div>
        </div>

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
