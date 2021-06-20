import React from 'react';
import ReactDOM from 'react-dom';
import {NewUser} from './newUser.jsx'
import '../style.sass';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			showing: "login"
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.returnToLogin = this.returnToLogin.bind(this);		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleSubmit() {
		// TODO
	}

	handleClick() {
		// Open up newUser page
		console.log("Show New User")
		this.setState({
			showing: "newUser"
		})
	}

	returnToLogin() {
		this.setState({ 
			showing: "login"
		})
	}

	showLoginPage() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Username:
				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
				</label>
				<label>Password:
				<input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
				</label>
				<input type="submit" value="Submit"/>
				<div onClick={this.handleClick}>New User</div>
			</form>
		)
	}

	showNewUser() {
		return <NewUser viewLogin={this.returnToLogin} />
	}

	render() {
		return (
			<div>
				{this.state.showing === "login" ? this.showLoginPage()

				: this.state.showing === "newUser"? this.showNewUser()

				: null}
			</div>	)
	}
}
