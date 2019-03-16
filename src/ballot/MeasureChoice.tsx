import * as React from 'react';
import EndorserList from './Endorsers/EndorserList';

interface IMeasureChoices extends Array<IMeasureChoice> { }

interface IMeasureChoice {
    id: string,
    text: string,
    url: string,
    urlText: string
}

class MeasureChoice extends React.Component<IMeasureChoice> {
    public render() {
        return (
            <div className="measure-choice">
                <a href={this.props.url} target="_blank" className="measure-link">{this.props.urlText}</a>
                <button className="measure-select measure-select">{this.props.text}</button>
                <EndorserList endorserList={[{ url: 'http://www.google.com', text: 'Test Endorsement' }]} />
            </div>
        );
    }
}

export { IMeasureChoice, IMeasureChoices, MeasureChoice };
