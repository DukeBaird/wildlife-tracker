import React from 'react';
import ReactDOM from 'react-dom';
import userLogo from '../../images/userLogo.png';

import menuButton from '../../images/menu.png';
import './userMenu.sass';

//const userLogo = require('.../images/userLogo.png').default;

export class UserMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideBar: false //Set to true when you need to debug sidebar
		};
		this.showUserSideBar = this.showUserSideBar.bind(this);
		this.createSideBar = this.createSideBar.bind(this);
		this.hideUserSideBar = this.hideUserSideBar.bind(this);
		this.logUserOut = this.logUserOut.bind(this);
	};

	showUserSideBar() {
		if (this.state.showSideBar === false) {
			this.setState({
				showSideBar: true
			});
		} else {
			this.setState({
				showSideBar: false
			});
		}
	};

	//Create the 'buttons' that are in the user sidebar
	createSideBar() {
		const navOptions = [];
		if (this.props.user) {
			navOptions.push(
				<div className="userSideBar">
					<div className="userBar">
						<img className="userLogo" src={userLogo} alt="User Logo"/>
						<div>{this.props.user}</div>
					</div>

					<div className="buttonContainer" onClick={this.props.viewProfile}>
						<div id="profileButton">Profile</div>
					</div>

					<div className="buttonContainer" onClick={this.props.viewHome}>
						<div id="homeButton">Home</div>
					</div>

					<div className="borderContainer"></div>

					<div className="buttonContainer" onClick={this.props.addSighting}>
						<div id="newSightingButton">Add Sighting</div>
					</div>

					<div className="buttonContainer" onClick={this.props.viewAnimals}>
						<div id="animalsButton">History</div>
					</div>

					<div className="borderContainer"></div>
					
					<div className="buttonContainer" onClick={this.logUserOut}>
						<div id="logoutButton">Log Out</div>
					</div>
				</div>
			);
		} else {
			navOptions.push(
				<div className="userSideBar">
					<div className="buttonContainer" onClick={this.props.viewLogin}>
						<div id="loginButton">Log In</div>
					</div>
				</div>
			);
		}

		return navOptions
	}

	//Remove div with 'buttons'
	hideUserSideBar() {
		this.setState({
			showSideBar: false
		});
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
			<div>
				<div onClick={this.showUserSideBar} onBlur={this.hideUserSideBar} tabIndex="-1">
					<div className="sideBarLogo">
						<img className="userLogo" src={menuButton} alt="User Logo"/>
					</div>
					{this.state.showSideBar === true ? this.createSideBar() : null}
				</div>
			</div>
		)
	};
};
