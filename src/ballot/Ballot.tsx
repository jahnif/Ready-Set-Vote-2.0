import * as React from "react";

import Header from "../Header";
import appleby from "../img/candidates/appleby.jpg";
import { ballotStore } from "./BallotStore";
import Candidate from "./Candidate";
import { CandidateStore } from "./CandidateStore";
import DistrictHeader from "./DistrictHeader";
import EndOfBallotInput from "./EndOfBallotInput";
import EndorserGrid from "./EndorserGrid";
import { EndorserStore } from "./EndorserStore";
import Measure from "./Measure";
import { MeasureStore } from "./MeasureStore";
import RaceHeader from "./RaceHeader";
import Sponsors from "./Sponsors";
import Step1Header from "./Step1Header";
import Step2Header from "./Step2Header";

import { GetBallotData } from '../services/BallotService';

class Ballot extends React.Component {
  constructor(props: any) {
    super(props);
    this.injectDemoData();
  }

  public componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public handleScroll = (event: UIEvent) => {
    const top = window.scrollY;
    const height =
      document.body.getBoundingClientRect().height - window.innerHeight;
    const percentComplete = Number(((top / height) * 100).toFixed(1));
    ballotStore.setPercentComplete(percentComplete);
  };

  public render() {
    return (
      <div>
        <Header />
        <Step1Header />
        <EndorserGrid ballotStore={ballotStore} />

        <Step2Header />
        <DistrictHeader districtName="State" />
        <RaceHeader raceName="Legislative District 37 State Senator" />
        <div className="seats">
          {ballotStore.candidates.map(c => {
            return (
              <div key={c.candidateId}>
                <Candidate candidate={c} />
              </div>
            );
          })}
        </div>

        <div className="main">
          <DistrictHeader districtName="Measures" />
          {ballotStore.measures.map(m => {
            return (
              <div key={m.measureTitle}>
                <Measure measure={m} />
              </div>
            );
          })}
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

  private injectDemoData() {
    const sampleData = GetBallotData();

    sampleData.endorsers.forEach(value => {
      const endorser = new EndorserStore(value.description, value.endorserId, value.endorserImg, value.endorserUrl, value.endorserUrlText);
      ballotStore.addEndorser(endorser);
    });

    const demoMeasure = new MeasureStore();
    demoMeasure.measureName = "Fake measure" ;
    demoMeasure.measureTitle = "A title" ;
    demoMeasure.yesChoiceLink = "Yes" ;
    demoMeasure.measureDescription = "Nonsense" ; 
    ballotStore.addMeasure(demoMeasure);
    const demoCandidate = new CandidateStore();
    demoCandidate.candidateId = "testId";
    demoCandidate.candidateName = "Rebecca Saldaña";
    demoCandidate.candidateUrl = "http://www.google.com";
    demoCandidate.candidateUrlText = "My super cool website";
    demoCandidate.imgSrc = appleby;
    demoCandidate.municipalLeagueRating = 4;
    demoCandidate.municipalLeagueRatingText = "Outstanding";
    demoCandidate.party = "PREFERS DEMOCRATIC PARTY";
    demoCandidate.userNames = "What goes here";
    ballotStore.addCandidate(demoCandidate);
  }
}

export default Ballot;
