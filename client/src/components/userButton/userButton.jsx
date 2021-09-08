import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '../button/button.jsx';
import userLogo from './userLogo.png';
import addButton from './add.png';
import historyButton from './history.png';
import './userButton.sass';

export class UserButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideBar: false, //Set to true when you need to debug sidebar
			showFloatingButtons: true
		};
		this.showUserSideBar = this.showUserSideBar.bind(this);
		this.createSideBar = this.createSideBar.bind(this);
		this.hideUserSideBar = this.hideUserSideBar.bind(this);
		this.logUserOut = this.logUserOut.bind(this);
	};

	showUserSideBar() {
		if (this.state.showSideBar === false) {
			this.setState({
				showSideBar: true,
				showFloatingButtons: false
			});
		} else {
			this.setState({
				showSideBar: false,
				showFloatingButtons: true
			});
		}
	};

	//Create the 'buttons' that are in the user sidebar
	createSideBar() {
		const navOptions = [];
		if (this.props.user) {
			navOptions.push(
				<div className="userBar">
					<img className="userLogo" src={userLogo} alt="User Logo"/>
					<div>{this.props.user}</div>
				</div>
			);
			navOptions.push(
				<div className="buttonContainer">
					<div id="profileButton" onClick={this.props.viewProfile}>Profile</div>
				</div>);
			navOptions.push(
				<div className="buttonContainer">
					<div id="homeButton" onClick={this.props.viewHome}>Home</div>
				</div>);
			navOptions.push(
				<div className="borderContainer"></div>
			);
			navOptions.push(
				<div className="buttonContainer">
					<div id="newSightingButton" onClick={this.props.addSighting}>Add Sighting</div>
				</div>
			);
			navOptions.push(
				<div className="buttonContainer">
					<div id="animalsButton" onClick={this.props.viewAnimals}>History</div>
				</div>
			);
			navOptions.push(
				<div className="borderContainer"></div>
			);
			navOptions.push(
				<div className="buttonContainer">
					<div id="logoutButton" onClick={this.logUserOut}>Log Out</div>
				</div>
			);
		} else {
			navOptions.push(
				<div className="buttonContainer">
					<div id="loginButton" onClick={this.props.viewLogin}>Log In</div>
				</div>
			);
		}

		return navOptions
	}

	//Remove div with 'buttons'
	hideUserSideBar() {
		this.setState({
			showSideBar: false,
			showFloatingButtons: true
		});
	};

	showFloatingButtons() {
		const buttons = [];
		
		buttons.push(<img className="floatingLogo" src={addButton} alt="Add Sighting" onClick={this.props.addSighting}/>);
		buttons.push(<img className="floatingLogo" src={historyButton} alt="Add Sighting" onClick={this.props.viewAnimals}/>);
		
		return buttons
	}

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
						<img className="userLogo" src={userLogo} alt="User Logo"/>
					</div>
					<div className="userSideBar">
						{this.state.showSideBar === true ? this.createSideBar() : null}
					</div>
				</div>
				<div id="rightSideSpacer"></div>
				<div className="floatingButtons">
					<div id="floatingContainer">
						{this.state.showFloatingButtons === true ? this.showFloatingButtons() : null}
					</div>
				</div>
			</div>
		)
	};
};
