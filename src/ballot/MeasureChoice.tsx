import * as React from 'react';
import EndorserList from './Endorsers/EndorserList';

interface IMeasureChoices extends Array<IMeasureChoice> { }

interface IMeasureChoice {
    id: string,
    text: string,
    url: string,
    urlText: string,
}

interface IMeasureChoiceProps extends IMeasureChoice {
    selected: boolean,
    handleSelectChoice: (id: string) => void,
}

class MeasureChoice extends React.Component<IMeasureChoiceProps> {
    public render() {
        return (
            <div className={ this.props.selected ? "measure-choice measure-choice-selected" : "measure-choice" }>
                <a href={this.props.url} target="_blank" className="measure-link">{this.props.urlText}</a>
                <button className="measure-select" onClick={this.onSelectChoice}>{this.props.text}</button>
                <EndorserList endorserList={[{ url: 'http://www.google.com', text: 'Test Endorsement' }]} />
            </div>
        );
    }

    private onSelectChoice = () => {
        this.props.handleSelectChoice(this.props.id);
    }
}

export { IMeasureChoice, IMeasureChoices, MeasureChoice, IMeasureChoiceProps };
