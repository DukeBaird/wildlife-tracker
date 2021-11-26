import React from 'react';
import ReactDOM from 'react-dom';
import pin from '../../images/pin.png';
import './marker.sass';

export class Marker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showingInfo: false
		}
		this.createInfo = this.createInfo.bind(this)
		this.updateShowingState = this.updateShowingState.bind(this)
	};

	updateShowingState() {
		console.log("Clicked on a marker");
		if (this.state.showingInfo === true) {
			this.setState({
				showingInfo: false
			});
		} else {
			this.setState({
				showingInfo: true
			});
		}
		console.log(this.state.showingInfo);
	};

	createInfo() {
		const spottedBy = this.props.info.spottedBy ? this.props.info.spottedBy: 'Mystery User';
		const time = this.props.info.time;
		const animal = this.props.info.animal;
		
		return <InfoBox spottedBy={spottedBy} time={time} animal={animal}/>
	}

	render() {
		const infoBox = this.state.showingInfo;
		return (
			<div className="markerContainer">
				{infoBox === true ? this.createInfo() : null}
				<img className="marker" src={pin} alt="Sighting Location" onClick={this.updateShowingState}/>
			</div>
		);
	};
}

function InfoBox(props) {
	return <div className="infobox">
			<h1>{props.animal}</h1>
			<h3>{props.spottedBy}</h3>
		</div>
	;
}
