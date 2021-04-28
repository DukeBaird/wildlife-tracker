import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

//Nav bar at top of page
export class Header extends React.Component {
	constructor(props) {
		super(props)
		this.newSighting = this.newSighting.bind(this);
	};

	newSighting() {
		this.props.addSighting();
	};

	render() {
		return (
			<span>
				<button onClick={viewHome}>Home</button>
				<button onClick={viewUser}>User</button>
				<button onClick={viewAnimals}>Animals</button>
				<button onClick={this.newSighting}>Add Sighting</button>
			</span>
		);
	};
}

//Event handlers for Header
function viewHome() {
	console.log("Clicked Home");
}

function viewUser() {
	console.log("Clicked User");
}

function viewAnimals() {
	console.log("Clicked Animals");
}