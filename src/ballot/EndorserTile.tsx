import * as React from 'react';
import '../css/ml.css';
import { IEndorser } from './Endorser';

class Endorser extends React.Component<IEndorser> {
    public render() {
        return (
            <div className="endorser" id={this.props.endorserId}>
				<div>
                    <img src={this.props.endorserImg} className="endLogo" />
                        <div className="endorser-desc">{this.props.description}</div>
				
                        <a href={this.props.endorserUrl} target="_blank" className="endorser-URL">{this.props.endorserUrlText}</a>
				</div>
				<button className="endorser-select">Add</button>
			</div>
        );
    }
}

export default Endorser;
