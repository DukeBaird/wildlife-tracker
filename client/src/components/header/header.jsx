import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import {Button} from '../button/button.jsx'
import './header.sass';

//Nav bar at top of page
export class Header extends React.Component {
	constructor(props) {
		super(props)
		this.logUserOut = this.logUserOut.bind(this);
	};

	logUserOut() {
		console.log("Logging user out");
		
		fetch('auth/v1/logout')
		.then(() => {
			console.log("Auth API is done logging out");
			localStorage.removeItem('user');
			console.log("Logged Out");
			this.props.onLogout();
		})
		.catch(err => {
			console.log(err);
		});
	};

	render() {
		return (
			<span className="Header">
				<Button handleClick={this.props.viewHomepage} text="Home" />
				{ this.props.user
					? <Button handleClick={this.props.viewProfile} text={this.props.user} />
					: <Button handleClick={this.props.viewLogin} text="User" />
				}
				<Button handleClick={this.props.viewAnimals} text="Animals" />
				<Button handleClick={this.props.addSighting} text="Add Sighting" />
				{ this.props.user
					? <Button handleClick={this.logUserOut} text="Logout" />
					: <Button handleClick={this.props.viewLogin} text="Login" />
				} 
			</span>
		);
	};
};
