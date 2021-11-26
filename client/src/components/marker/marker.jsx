import React from 'react';
import ReactDOM from 'react-dom';
import pin from '../../images/pin.png';
import './marker.sass';

export class Marker extends React.Component {
	constructor(props) {
		super(props)
	};


	render() {
		return <img className="marker" src={pin} alt="Sighting Location"/>
	};
}
