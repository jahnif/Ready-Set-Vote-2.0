import * as React from 'react';

interface IMeasureChoice {
    endorserUrl: string,
    endorserUrlText: string,
    measureChoiceUrl: string,
    measureChoiceUrlText: string,
    measureChoiceText: string
}

class MesaureChoice extends React.Component<IMeasureChoice> {
    public render() {
        return (
            <div className="measure-choice">
                <a href={this.props.measureChoiceUrl} target="_blank" className="measure-link">{this.props.measureChoiceUrlText}</a>
                <button className="measure-select measure-select">{this.props.measureChoiceText}</button>
                <span className="measure-endorsedBy-head">Endorsed By:</span>
                <a className="endlink endlink" href={this.props.endorserUrl} target='_blank'>{this.props.endorserUrlText}</a>
                <div className="endorserList">TODO LIST</div>
            </div>
        );
    }
}

export default MesaureChoice;
