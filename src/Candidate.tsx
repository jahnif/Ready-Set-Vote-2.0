import * as React from 'react';
import './css/ml.css';

import EndorserList from './EndorserList';

interface ICandidateProps {
    candidate: ICandidate
}

interface ICandidate {
    candidateId: string,
    imgSrc: string,
    party: string,
    candidateName: string,
    candidateUrl: string,
    candidateUrlText: string,
    userNames: string,
    municipalLeagueRating: string
}

class Candidate extends React.Component<ICandidateProps> {
    public render() {
        return (
            <div className="seat" id={this.props.candidate.candidateId}>
                <img src={this.props.candidate.imgSrc} className="candidate-pic"/>
                <div className="seat-party">{this.props.candidate.party}</div>
                <div className="seat-name">{this.props.candidate.candidateName}</div>
                <a href={this.props.candidate.candidateUrl} target="_blank" className="seat-url">{this.props.candidate.candidateUrlText}</a>
                <div className="seat-divider"/>
                <div className="seat-endorsedBy">
                    <EndorserList endorserList={
                        [{ url: 'http://www.google.com', text: 'Test Endorsement' }]
                    } />
                    <div className="mlRating">
                        Municipal League Rating:
                        <br /><span>
                            <a>{this.props.candidate.municipalLeagueRating}</a></span>
                    </div>
						<button className="seat-select" id="seat-selectIDTODO">Pick</button>
					</div>
            </div>
        );
    }
}

export default Candidate;
