import * as React from 'react';
import './css/ml.css';

interface IRaceName {
    raceName: string
}

class DistrictHeader extends React.Component<IRaceName> {
    public render() {
        return (
            <div className="seat-head">
                <span>{this.props.raceName}</span>
            </div>
        );
    }
}

export default DistrictHeader;
