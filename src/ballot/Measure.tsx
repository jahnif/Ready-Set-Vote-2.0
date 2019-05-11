import * as React from 'react';

import { MeasureChoice } from './MeasureChoice';
import { MeasureStore } from './MeasureStore';

interface IMeasureProps {
    measure: MeasureStore
}

class Measure extends React.Component<IMeasureProps> {
    public render() {
        return (
            <div className="measure">
                <div className="measure-name">{this.props.measure.name}</div>
                <div className="measure-title">{this.props.measure.title}</div>
                <div className="measure-desc">{this.props.measure.description}</div>
                <div className="measure-choices">
                    {this.props.measure.choices.map(choice => {
                        return (
                            <MeasureChoice
                                key={choice.id}
                                id={choice.id}
                                text={choice.text}
                                url={choice.url}
                                urlText={choice.urlText} />
                        )
                    })}                
                </div>
            </div>
        );
    }
}

export default Measure;
