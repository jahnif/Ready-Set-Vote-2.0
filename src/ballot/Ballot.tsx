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
    const demoEndorser = new EndorserStore(
      "The Seattle Times provides local news, sports, business, politics, entertainment, travel, restaurants and opinion for Seattle and the Pacific Northwest",
      "1234",
      "favicon.ico",
      "https://www.seattletimes.com/opinion/the-seattle-times-endorsements-for-the-november-7-2017-election/",
      "seattletimes.com"
    );
    ballotStore.addEndorser(demoEndorser);
    const demoEndorser2 = new EndorserStore(
      "The Stranger is Seattle's free weekly alternative arts and culture newspaper",
      "5678",
      "favicon.ico",
      "http://thestranger.com/features/2017/10/11/25459963/the-strangers-endorsements-for-the-november-7-2017-general-election",
      "thestranger.com"
    );
    ballotStore.addEndorser(demoEndorser2);
    const demoMeasure = new MeasureStore();
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
