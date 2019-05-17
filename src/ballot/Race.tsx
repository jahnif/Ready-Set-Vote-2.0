import * as React from 'react';

import { Candidate, ICandidate } from './Candidate';

interface IRaceProps {
    id: string,
    name: string,
    candidates: ICandidate[]
}

interface IRaceState {
    selectedCandidateId: string,
}
  
class Race extends React.Component<IRaceProps, IRaceState> {
    constructor(props: any) {
      super(props);
      
      this.state = {
          selectedCandidateId: ''
      };
    }

    public render() {
        return (
            <div className="seats" key={this.props.id}>
                <div className="seat-head">
                    <span>{this.props.name}</span>
                </div>
                {this.props.candidates.map(candidate => {
                  return (
                    <Candidate key={candidate.id} 
                        id={candidate.id}
                        image={candidate.image}
                        name={candidate.name}
                        party={candidate.party}
                        url={candidate.url}
                        urlText={candidate.urlText}
                        selected={candidate.id === this.state.selectedCandidateId}
                        handleSelectCandidate={this.handleSelectCandidate} />
                  );
                })}       
            </div>
        );
    }

    private handleSelectCandidate = (id: string) => {
        if (this.state.selectedCandidateId === id) {
            this.setState({ selectedCandidateId: '' });
        } else {
            this.setState({ selectedCandidateId: id });
        }
    }
}

export default Race;
