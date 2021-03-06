import React from 'react';
import ReactDOM from 'react-dom';
import './addSighting.sass';

export class NewSighting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animal: '',
			location: '',
			time: '',
			image: ''
		}
		this.handleAnimalChange = this.handleAnimalChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAnimalChange(event) {
		this.setState({animal: event.target.value});
	}

	handleLocationChange(event) {
		this.setState({location: event.target.value});
	}

	handleSubmit() {
		this.props.createNewSighting(this.state.animal, this.state.location);
	}

	handleSubmit(event) {
		event.preventDefault();

		const newSighting = {
			animal: this.state.animal,
			location: this.state.location,
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
			<div id="addSightingContainer">
				<form onSubmit={this.handleSubmit}>
					<label>
						Animal:
						<input type="text" value={this.state.animal} onChange={this.handleAnimalChange} />
					</label>
					<label>
						Location:
						<input type="text" value={this.state.location} onChange={this.handleLocationChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		)}
};
