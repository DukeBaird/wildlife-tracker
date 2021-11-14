import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleMap} from '../googleMap/googleMap.jsx';
import '../../../style.sass';
import './addSighting.sass';

export class NewSighting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: null,
			time: '',
			image: ''
		}
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.animalInput = React.createRef();
		this.locationDevice = React.createRef();
	}

	handleLocationChange(spottedLocation) {
		this.setState({location: spottedLocation});
	}

	/*handleSubmit() {
		this.props.createNewSighting(this.animalInput.current.value, this.state.location);
	}*/

	handleSubmit(event) {
		event.preventDefault();

		const newSighting = {
			animal: this.animalInput.current.value,
			location: JSON.stringify(this.state.location),
			time: new Date(),
		};

		console.log(newSighting);

		//Prepare info for fetch call
		const newSightingInfo = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',          
			},
			body: JSON.stringify(newSighting)
		};

		//Add sighting to DB and return to home
		fetch('/api/v1/sighting', newSightingInfo)
		.then(response => {
			response.json();
			console.log("Success");
			this.props.return(); //Return to homepage
		})
		.catch(err => {
			console.log("addSighting caught error")
			console.log(err);
		});
	}
	
	render() {
		return (

			/*
			Currently have location passed to this state from the map whenever user clicks on the map.
			This causes the AddSighting to re-render, re-rendering the map as well, as it gets a new prop
			*/
			
			<div>
				<GoogleMap view="create" onClick={this.handleLocationChange} location={this.state.location}/>
				{/* <GoogleMap view="create" onClick={this.handleLocationChange} /> */}
				<div id="addSightingContainer">
					<form id="addSightingForm" onSubmit={this.handleSubmit}>
						<div id="locationDevice">
							Click map to select location or check to use device location {/*Currently will only use map location*/}
							<input type="checkbox" ref={this.locationDevice}/>
						</div>
						<div>
							<input 
								className="addSightingInput"
								type="text"
								placeholder="Animal"
								ref={this.animalInput} />
						</div>
						<div>
							<input id="addSightingSubmit" type="submit" value="Submit"/>
						</div>
					</form>
				</div>
			</div>
		)}
};
