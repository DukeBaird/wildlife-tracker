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
			<div className="NewSighting">
				<form onSubmit={this.handleSubmit}>
					<label className="inputLabel">
						<span>Animal:</span>
						<input type="text" value={this.state.animal} onChange={this.handleAnimalChange} />
					</label>
					<label className="inputLabel">
						<span>Location:</span>
						<input type="text" value={this.state.location} onChange={this.handleLocationChange}/>
					</label>
					<div className="inputDiv">
						<input className="submit" type="submit" value="Submit"/>
					</div>
				</form>
			</div>
        )}
};