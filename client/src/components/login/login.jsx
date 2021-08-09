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
		this.showNewUser = this.showNewUser.bind(this);
		this.updateAppUserState = this.updateAppUserState.bind(this);
		this.goHome = this.goHome.bind(this);
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
			// console.log(data);
			// console.log(data.data);
			if (response.data) {
				console.log("Logged in!");
				localStorage.setItem('user', JSON.stringify(response.data));
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

	showNewUser() {
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

	showLoginPage() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Username:
				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
				</label>
				<label>Password:
				<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
				</label>
				<input type="submit" value="Submit"/>
				<div onClick={this.showNewUser}>New User</div>
			</form>
		)
	}

	showNewUser() {
		return <NewUser viewLogin={this.showLogin} return={this.goHome} />
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
