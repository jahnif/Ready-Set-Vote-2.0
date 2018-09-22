import * as React from "react";
import "./App.css";
import Candidate from './Candidate';

class Ballot extends React.Component {

 public render() {

   const testData = {
     candidateId: 'testId',
     candidateName: 'Marty McPolitican',
     candidateUrl: 'http://www.google.com',
     candidateUrlText: 'My super cool website',
     imgSrc: '',
     municipalLeagueRating: 'Amazinggggggggg',
     party: 'PARTYYY',
     userNames: 'What goes here',
   };

   return (
     <div className="main">
       <h3>Your Ballot Guide.</h3>
       <div className="step" id="step1">
         <span>Step 1:</span> We'll show you endorsements from these trusted
         organizations as well as recommendations from the Municipal League on
         your ballot below. Uncheck the ones you don't want to see.
       </div>

       <Candidate data={testData} />
     </div>
   );
 }
}

export default Ballot;