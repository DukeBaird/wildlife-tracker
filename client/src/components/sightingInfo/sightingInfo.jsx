import React from 'react';
import ReactDOM from 'react-dom';

export class SightingInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>{this.props.sighting.animal}</h2>
				<h4>{this.props.sighting.location}</h4>
				<h4>{this.props.sighting.time}</h4>	
			</div>	
		);
	}
}
