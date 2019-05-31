import * as React from 'react';
import './css/ml.css';
import torch from './img/torch_white.svg'

class Footer extends React.Component {
    public render() {
        return (
            <footer>
	    	    <div>A Project of the <a href="http://munileague.org" target="_blank">Municipal League <img src={torch} width="35" height="35" alt="Torch Logo" /></a>
            <a href="https://munileague.z2systems.com/np/clients/munileague/donation.jsp"><span className="donate">Donate</span></a></div>
	        </footer> 
        );
    }
}

export default Footer;
