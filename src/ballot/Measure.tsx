import * as React from 'react';


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
                    <MeasureChoice
                            endorserUrl={this.props.measure.measureChoiceEndorsement}
                            endorserUrlText={this.props.measure.yesMeasureEndorser}
                            measureChoiceUrl={this.props.measure.yesChoiceLink}
                            measureChoiceUrlText={this.props.measure.yesChoiceText}
                            measureChoiceText="Yes" />
                    <MeasureChoice
                            endorserUrl="http://www.google.com"
                            endorserUrlText=""
                            measureChoiceUrl="http://www.google.com"
                            measureChoiceUrlText="No"
                            measureChoiceText="what's this" />
                
                </div>
                
                <div className="measure-ml">
                    Municipal League Recommends: <span>{this.props.measure.municipalLeaugeRecommendation}</span>
                </div>
            </div>
        );
    }
}

export default Measure;
