import * as React from "react";
import "./App.css";

import CallToAction from "./CallToAction";
import Candidate from './Candidate';
import DistrictHeader from './DistrictHeader';
import Endorser from './Endorser';
import appleby from './img/candidates/appleby.jpg'
import RaceHeader from './RaceHeader';
import Sponsors from './Sponsors';

class Ballot extends React.Component {

 public render() {

   const testData = {
     candidateId: 'testId',
     candidateName: 'Marty McPolitican',
     candidateUrl: 'http://www.google.com',
     candidateUrlText: 'My super cool website',
     imgSrc: appleby,
     municipalLeagueRating: 'Amazinggggggggg',
     party: 'PARTYYY',
     userNames: 'What goes here',
   };

   return (
     <div>
       <CallToAction />
       <Endorser description="The Seattle Times"
        endorserId="1234"
        endorserImg=""
        endorserUrl="http://www.google.com"
         endorserUrlText="The Seattle Times" />
       <DistrictHeader districtName="Test District" />
       <RaceHeader raceName="Test Race" />
       <Candidate data={testData} />
       <Sponsors sponsors={[
         { altText: "Seattle Seahawks", imgSrc: "https://readysetvote.org/img/sponsor_seahawks.gif" }
       ]} />
     </div>
   );
 }
}

export default Ballot;