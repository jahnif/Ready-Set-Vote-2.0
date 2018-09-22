import * as React from 'react';
import './css/ml.css';

import EndorserList from './EndorserList';
import MeasureChoice from './MeasureChoice';

interface IMeasureProps {
    data: IMeasure
}

interface IMeasure {
    measureDescription: string,
    measureName: string,
    measureTitle: string
    yesChoiceLink: string,
    measureChoiceEndorsement: string,
    yesChoiceText: string,
    yesMeasureEndorser: string,
    municipalLeaugeRecommendation: string
}

class Measure extends React.Component<IMeasureProps> {
    public render() {
        return (
            <div className="measure">
                <div className="measure-name">{this.props.data.measureName}</div>
                <div className="measure-title">{this.props.data.measureTitle}</div>
                <div className="measure-desc">{this.props.data.measureDescription}</div>
                <div className="measure-choices">
                    <div className="measure-choice" id={"1"/* TODO Measure ID*/}>
                        <a href={this.props.data.yesChoiceLink} target="_blank" className="measure-link">{this.props.data.yesChoiceText}</a>
                        <button className="measure-select" >Yes</button>
                        <span className="measure-endorsedBy-head">Endorsed By:</span>
                        <a className='endlink endlink' href={this.props.data.measureChoiceEndorsement} target='_blank'>{this.props.data.yesMeasureEndorser}</a>
                        <EndorserList endorserList={[{ url: 'http://www.google.com', text: 'Test Endorsement' }]} />
                        <MeasureChoice
                            endorserUrl="http://www.google.com"
                            endorserUrlText=""
                            measureChoiceUrl="http://www.google.com"
                            measureChoiceUrlText="Yes"
                            measureChoiceText="what's this" />
                    </div>
                </div>
                <div className="measure-ml">
                    Municipal League Recommends: <span>{this.props.data.municipalLeaugeRecommendation}</span>
                </div>
            </div>
        );
    }
}

export default Measure;
