import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '../button/button.jsx';
import userLogo from './userLogo.png';
import './userButton.sass';

export class UserButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showButtons: false
		};
		this.showUserButtons = this.showUserButtons.bind(this);
		this.showButtons = this.showButtons.bind(this);
		this.hideUserButtons = this.hideUserButtons.bind(this);
		this.logUserOut = this.logUserOut.bind(this);
	};

	showUserButtons() {
		this.setState({
			showButtons: true
		});
	};

	showButtons() {
		console.log("running showButtons");
		const buttons = [];
		if (this.props.user) {
			buttons.push(<Button handleClick={this.props.viewProfile} text={this.props.user} />);
			buttons.push(<Button handleClick={this.logUserOut} text="Logout" />);
		} else {
			buttons.push(<Button handleClick={this.props.viewLogin} text="Login" />);
		}

		return buttons
	}

	hideUserButtons() {

		setTimeout(() => {
			this.setState({ showButtons: false })}, 100);
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
				<div onFocus={this.showUserButtons} onBlur={this.hideUserButtons} tabIndex="-1">
					<img id="userLogo" src={userLogo} alt="User Logo"/>
					<div>
						{this.state.showButtons === true ? this.showButtons() : null}
					</div>
				</div>
			</div>
		)
	};
};
