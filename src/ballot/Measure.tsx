import * as React from 'react';

import { MeasureChoice } from './MeasureChoice';
import { MeasureStore } from './MeasureStore';

interface IMeasureProps {
    measure: MeasureStore
}

interface IMeasureState {
    selectedChoiceId: string,
}
  
class Measure extends React.Component<IMeasureProps, IMeasureState> {
    constructor(props: any) {
      super(props);
      
      this.state = {
          selectedChoiceId: ''
      };
    }

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
                                urlText={choice.urlText}
                                selected={choice.id === this.state.selectedChoiceId}
                                handleSelectChoice={this.handleSelectChoice}/>
                        )
                    })}                
                </div>
            </div>
        );
    }

    private handleSelectChoice = (id: string) => {
        if (this.state.selectedChoiceId === id) {
            this.setState({ selectedChoiceId: '' });
        } else {
            this.setState({ selectedChoiceId: id });
        }
    }
}

export default Measure;
