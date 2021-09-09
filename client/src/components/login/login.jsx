import React from 'react';
import ReactDOM from 'react-dom';
import {NewUser} from '../newUser/newUser.jsx'
import './login.sass';

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
		this.showLogin = this.showLogin.bind(this);		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateShowingState = this.updateShowingState.bind(this);
		this.updateAppUserState = this.updateAppUserState.bind(this);
		this.goHome = this.goHome.bind(this);
		this.renderLoginPage = this.renderLoginPage.bind(this);
		this.renderNewUser = this.renderNewUser.bind(this);
	};

	goHome() {
		this.props.return();
	};

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	};

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	};

	updateAppUserState() {;
		console.log("Telling App to update State")
		this.props.onLogin();
	};

	handleSubmit(event) {
		event.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password
		};

		const userInfo = {
			method: 'post',
			// credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		};

		fetch('auth/v1/login', userInfo)
		.then(response => response.json())
		.then(response => {
			if (response.data) {
				console.log("Logged in!");
				const userData = response.data;
				delete userData["password"];
				localStorage.setItem('user', JSON.stringify(userData));
				this.setState({
					username: '',
					password: ''
				});
				this.updateAppUserState();
				this.goHome();
			} else {
				console.log("Oops - unable to log in");
				localStorage.removeItem('user');
				this.setState({
					password: ''
				});
			};
		})
		.catch(err => {
			console.log("Error logging user in");
			console.log(err);
		});

	}

	updateShowingState() {
		// Open up newUser page
		console.log("Show New User")
		this.setState({
			showing: "newUser"
		})
	}

	showLogin() {
		this.setState({ 
			showing: "login"
		})
	}

	renderLoginPage() {
		return (
			<div id="loginContainer">
				<form id="loginForm" onSubmit={this.handleSubmit}>
					<div>
						<input className="loginInput" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username"/>
					</div>
					<div>
						<input className="loginInput" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
					</div>
					<div>
						<input id="loginSubmit" type="submit" value="Sign In"/>
					</div>
				</form>
				<div id="signupLinkContainer">
					<div>New to the site? </div>
					<div id="signupLink" onClick={this.updateShowingState}> Sign Up</div>
				</div>
			</div>
		)
	}

	renderNewUser() {
		return <NewUser 
			viewLogin={this.showLogin}
			updateState={this.updateAppUserState}
			return={this.goHome} />
	}

	render() {
		return (
			<div>
				{this.state.showing === "login" ? this.renderLoginPage()

				: this.state.showing === "newUser"? this.renderNewUser()

				: null}
			</div>	)
	}
}
