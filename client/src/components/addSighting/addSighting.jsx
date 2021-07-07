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

	render() {
		return (
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
		)}
};
