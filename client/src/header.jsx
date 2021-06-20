import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

//Nav bar at top of page
export class Header extends React.Component {
	constructor(props) {
		super(props)
		this.showNewSighting = this.showNewSighting.bind(this);
		this.showAnimalList = this.showAnimalList.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.goHome = this.goHome.bind(this);
	};

    goHome() {
        this.props.viewHomepage();
    }

	showNewSighting() {
		this.props.addSighting();
	};

    showAnimalList() {
        this.props.viewAnimals();
    }

	showLogin() {
		this.props.viewLogin();
	}

	render() {
		return (
			<span>
				<button onClick={this.goHome}>Home</button>
				<button onClick={viewUser}>User</button>
				<button onClick={this.showAnimalList}>Animals</button>
				<button onClick={this.showNewSighting}>Add Sighting</button>
				<button onClick={this.showLogin}>Login</button>
			</span>
		);
	};
}

//Event handlers for Header
function viewUser() {
	console.log("Clicked User");
}
