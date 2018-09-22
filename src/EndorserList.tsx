import * as React from 'react';

interface IEndorserList {
    endorserList: [IEndorserLink]
}

interface IEndorserLink {
    url: string,
    text: string
}

class EndorserList extends React.Component<IEndorserList> {
    public render() {
        return (
            <div>
            <span className="measure-endorsedBy-head">Endorsed By:</span>
            <div className="endorserList">
                {this.props.endorserList.map((endorser, i) => {
                    return <a key={i} className="endlink" href={endorser.url} target="_blank">
                        {endorser.text}
                    </a>
                })}
                </div>
            </div>
        );
    }
}

export default EndorserList;
