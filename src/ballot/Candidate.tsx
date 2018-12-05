import * as React from 'react';
import '../css/ml.css';

import EndorserList from './Endorsers/EndorserList';
import Rating from './Rating';

interface ICandidateData {
    id: string;
    image: string;
    name: string;
    party: string;
    url: string;
    urlText: string;
}

interface ICandidateProps {
    candidate: ICandidateData
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
            <div className="seat" id={this.props.candidate.id}>
                <img src={this.props.candidate.image} className="candidate-pic" />
                <div className="seat-party">{this.props.candidate.party}</div>
                <div className="seat-name">{this.props.candidate.name}</div>
                <a href={this.props.candidate.url} target="_blank" className="seat-url">{this.props.candidate.urlText}</a>
                <div className="seat-divider" />
                <div className="seat-endorsedBy">
                    <EndorserList endorserList={
                        [{ url: 'http://www.google.com', text: 'Test Endorsement' }]
                    } />
                    <div className="mlRating">
                        Municipal League Rating:
                        <br />
                        <span className="rating-text">
                            <a onClick={this.showRating}>{/*this.props.candidate.municipalLeagueRatingText*/'TODO'}</a>
                        </span>
                        { this.state.showRatingDetails && <Rating ratingLevel={/*this.props.candidate.municipalLeagueRating*/1} hideRatingCallback={this.hideRating} /> }
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
