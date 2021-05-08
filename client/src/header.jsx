import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

//Nav bar at top of page
export class Header extends React.Component {
	constructor(props) {
		super(props)
		this.newSighting = this.newSighting.bind(this);
    	this.animalList = this.animalList.bind(this);
    	this.goHome = this.goHome.bind(this);
	};

    goHome() {
        this.props.viewHomepage();
    }

	newSighting() {
		this.props.addSighting();
	};

    animalList() {
        this.props.viewAnimals();
    }

	render() {
		return (
			<span>
				<button onClick={this.goHome}>Home</button>
				<button onClick={viewUser}>User</button>
				<button onClick={this.animalList}>Animals</button>
				<button onClick={this.newSighting}>Add Sighting</button>
			</span>
		);
	};
}

//Event handlers for Header
function viewUser() {
	console.log("Clicked User");
}
