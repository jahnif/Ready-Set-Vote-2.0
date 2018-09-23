import * as React from 'react';
import '../css/ml.css';

interface IDistrictHeader {
    districtName: string
}

class DistrictHeader extends React.Component<IDistrictHeader> {
    public render() {
        return (
            <div className="region-head">
                <span>{this.props.districtName}</span>
            </div>
        );
    }
}

export default DistrictHeader;
