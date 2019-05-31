import * as React from 'react';
import '../css/ml.css';

import EndorserList from './Endorsers/EndorserList';

interface ICandidate {
    id: string;
    image: string;
    name: string;
    party: string;
    url: string;
    urlText: string;
}

interface ICandidateProps extends ICandidate {
    selected: boolean,
    handleSelectCandidate: (id: string) => void,
}

class Candidate extends React.Component<ICandidateProps> {
    public render() {
        return (
            <div className={ this.props.selected ? "seat seat-selected" : "seat" } id={this.props.id}>
                <img src={this.props.image} className="candidate-pic" />
                <div className="seat-party">{this.props.party}</div>
                <div className="seat-name">{this.props.name}</div>
                <a href={this.props.url} target="_blank" className="seat-url">{this.props.urlText}</a>
                <div className="seat-divider" />
                <div className="seat-endorsedBy">
                    <EndorserList endorserList={
                        [{ url: 'http://www.google.com', text: 'Test Endorsement' }]
                    } />
                    <button className="seat-select" id="seat-selectIDTODO" onClick={this.onSelectCandidate}>Pick</button>
                </div>
            </div>
        );
    }

    private onSelectCandidate = () => {
        this.props.handleSelectCandidate(this.props.id);
    }
}

export { Candidate, ICandidate };
