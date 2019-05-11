import * as React from 'react';
import './css/ml.css';
import torch from './img/torch_white.svg'

class Footer extends React.Component {
    public render() {
        return (
            <footer>
	    	    <div>A Project of the <a href="http://munileague.org" target="_blank">Municipal League <img src={torch} width="35" height="35" alt="Torch Logo" /></a></div>
	        </footer> 
        );
    }
}

export default Footer;
