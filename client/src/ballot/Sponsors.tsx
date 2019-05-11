import * as React from 'react';

interface ISponsors {
    sponsors: [ISponsor]
}

interface ISponsor {
    altText: string,
    imgSrc: string
}

class Sponsors extends React.Component<ISponsors> {
    public render() {
        return (
            <div className="sponsors">
	            <p>This website was made possible with the support of these valued partners and sponsors.</p>
                <div className="sponsor-logos">
                    {this.props.sponsors.map((sponsor, i) => {
                        return <div key={i} className="sponsor">
                            <img src={sponsor.imgSrc} alt={sponsor.altText} />
                        </div>
                    })}
                    
                </div>
            </div>
        );
    }
}

export default Sponsors;
