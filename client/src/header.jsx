import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from './components/button/button.jsx'
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
				<Button handleClick={this.goHome} text="Home" />
				<Button handleClick={viewUser} text="User" />
				<Button handleClick={this.showAnimalList} text="Animals" />
				<Button handleClick={this.showNewSighting} text="Add Sighting" />
				<Button handleClick={this.showLogin} text="Login" />
			</span>
		);
	};
}

//Event handlers for Header
function viewUser() {
	console.log("Clicked User");
}
