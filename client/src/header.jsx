import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
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
		this.logUserOut = this.logUserOut.bind(this);
		this.showLogout = this.showLogout.bind(this);
	};

	goHome() {
		this.props.viewHomepage();
	};

	showNewSighting() {
		this.props.addSighting();
	};

	showAnimalList() {
		this.props.viewAnimals();
	};

	showLogin() {
		this.props.viewLogin();
	};

	showLogout() {
		this.props.onLogout()
	};

	logUserOut() {
		console.log("Logging user out");
		
		fetch('auth/v1/logout')
		.then(() => {
			console.log("Auth API is done logging out");
			localStorage.removeItem('user');
			console.log("Logged Out");
			this.showLogout();
		})
		.catch(err => {
			console.log(err);
		});
	};

	render() {
		return (
			<span>
				<Button handleClick={this.goHome} text="Home" />
				{ this.props.user
					? <Button handleClick={this.props.viewProfile} text={this.props.user} />
					: <Button handleClick={this.showLogin} text="User" />
				}
				<Button handleClick={this.showAnimalList} text="Animals" />
				<Button handleClick={this.showNewSighting} text="Add Sighting" />
				{ this.props.user
					? <Button handleClick={this.logUserOut} text="Logout" />
					: <Button handleClick={this.showLogin} text="Login" />
				} 
			</span>
		);
	};
};

//Event handlers for Header
function viewUser() {
	console.log(Cookies.get('connect.sid'));
	console.log(Cookies.get());
	console.log("Clicked User");
};
