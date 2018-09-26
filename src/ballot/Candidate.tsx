import * as React from 'react';
import '../css/ml.css';

import { CandidateStore } from './CandidateStore';
import EndorserList from './EndorserList';
import Rating from './Rating';

interface ICandidateProps {
    candidate: CandidateStore
}

interface ICandidateState {
    showRatingDetails: boolean
}

class Candidate extends React.Component<ICandidateProps, ICandidateState> {
    constructor(props: ICandidateProps) {
        super(props);

        this.state = {
            showRatingDetails: false
        };

        this.hideRating = this.hideRating.bind(this);
        this.showRating = this.showRating.bind(this);
    }

    public render() {
        return (
            <div className="seat" id={this.props.candidate.candidateId}>
                <img src={this.props.candidate.imgSrc} className="candidate-pic" />
                <div className="seat-party">{this.props.candidate.party}</div>
                <div className="seat-name">{this.props.candidate.candidateName}</div>
                <a href={this.props.candidate.candidateUrl} target="_blank" className="seat-url">{this.props.candidate.candidateUrlText}</a>
                <div className="seat-divider" />
                <div className="seat-endorsedBy">
                    <EndorserList endorserList={
                        [{ url: 'http://www.google.com', text: 'Test Endorsement' }]
                    } />
                    <div className="mlRating">
                        Municipal League Rating:
                        <br />
                        <span className="rating-text">
                            <a onClick={this.showRating}>{this.props.candidate.municipalLeagueRatingText}</a>
                        </span>
                        { this.state.showRatingDetails && <Rating ratingLevel={this.props.candidate.municipalLeagueRating} hideRatingCallback={this.hideRating} /> }
                    </div>
                    <button className="seat-select" id="seat-selectIDTODO">Pick</button>
                </div>
            </div>
        );
    }

    private hideRating() {
        this.setState({
            showRatingDetails: false
        })
    }

    private showRating() {
        this.setState({
            showRatingDetails: true
        })
    }
}

export default Candidate;
