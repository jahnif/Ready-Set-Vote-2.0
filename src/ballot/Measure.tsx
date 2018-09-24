import * as React from 'react';

import EndorserList from './EndorserList';
import MeasureChoice from './MeasureChoice';
import { MeasureStore } from './MeasureStore';

interface IMeasureProps {
    measure: MeasureStore
}

class Measure extends React.Component<IMeasureProps> {
    public render() {
        return (
            <div className="measure">
                <div className="measure-name">{this.props.measure.measureName}</div>
                <div className="measure-title">{this.props.measure.measureTitle}</div>
                <div className="measure-desc">{this.props.measure.measureDescription}</div>
                <div className="measure-choices">
                    <div className="measure-choice" id={"1"/* TODO Measure ID*/}>
                        <a href={this.props.measure.yesChoiceLink} target="_blank" className="measure-link">{this.props.measure.yesChoiceText}</a>
                        <button className="measure-select" >Yes</button>
                        <span className="measure-endorsedBy-head">Endorsed By:</span>
                        <a className='endlink endlink' href={this.props.measure.measureChoiceEndorsement} target='_blank'>{this.props.measure.yesMeasureEndorser}</a>
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
                    Municipal League Recommends: <span>{this.props.measure.municipalLeaugeRecommendation}</span>
                </div>
            </div>
        );
    }
}

export default Measure;
