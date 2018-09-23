import { observer } from 'mobx-react';
import * as React from 'react';
import '../css/ml.css';
import { EndorserStore } from './EndorserStore';

@observer
class EndorserTile extends React.Component<{endorserStore: EndorserStore}> {
    public render() {
        const { endorserStore } = this.props;
        const endorserClasses = endorserStore.selected ? "endorser endorser-selected" :  "endorser";
        return (
            <div className={endorserClasses} id={endorserStore.endorserId}>
				<div>
                    <img src={endorserStore.endorserImg} className="endLogo" />
                        <div className="endorser-desc">{endorserStore.description}</div>
				
                        <a href={endorserStore.endorserUrl} target="_blank" className="endorser-URL">{endorserStore.endorserUrlText}</a>
				</div>
				<button className="endorser-select" onClick={endorserStore.selectEndorser}>Add</button>
			</div>
        );
    }
}

export default EndorserTile;
