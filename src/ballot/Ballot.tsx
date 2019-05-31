import * as React from "react";

import Footer from '../Footer';
import Header from "../Header";
import { ballotStore } from "./BallotStore";
import DistrictHeader from "./DistrictHeader";
import EndOfBallotInput from "./EndOfBallotInput";
import EndorserGrid from "./Endorsers/EndorserGrid";
import { EndorserStore } from "./Endorsers/EndorserStore";
import Measure from "./Measure";
import { MeasureStore } from "./MeasureStore";
import Race from "./Race";
import Sponsors from "./Sponsors";
import Step1Header from "./Step1Header";
import Step2Header from "./Step2Header";

import { GetDistricts, GetEndorsers, GetMeasures } from '../services/Services';

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
    const mockDistrictData = GetDistricts();

    return (
      <div>
        <Header />
        <Step1Header />
        <EndorserGrid ballotStore={ballotStore} />

        <Step2Header />

        {mockDistrictData.districts.map(district => {
          return (
            <React.Fragment key={district.id}>
              <DistrictHeader key={district.id} districtName={district.name} />
              {district.races.map(race => {
                return (
                  <Race key={race.id} id={race.id} name={race.name} candidates={race.candidates} />
                )
              })}
            </React.Fragment>
          )
        })}

        <div className="main">
          <DistrictHeader districtName="Measures" />
          {ballotStore.measures.map(measure => {
            return (
              <div key={measure.id}>
                <Measure measure={measure} />
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
        <Footer />
      </div>
    );
  }

  private injectDemoData() {
    const mockEndorserData = GetEndorsers();
    const mockMeasureData = GetMeasures();

    mockEndorserData.endorsers.forEach(value => {
      const endorser = new EndorserStore(value.description, value.endorserId, value.endorserImg, value.endorserUrl, value.endorserUrlText);
      ballotStore.addEndorser(endorser);
    });

    mockMeasureData.measures.forEach(measure => {
      const demoMeasure = new MeasureStore();
      demoMeasure.name = measure.name;
      demoMeasure.title = measure.title;
      demoMeasure.description = measure.description;
      demoMeasure.choices = measure.choices;
      ballotStore.addMeasure(demoMeasure)
    });
  }
}

export default Ballot;
