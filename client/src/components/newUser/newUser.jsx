import React from 'react';
import ReactDOM from 'react-dom';
import './newUser.sass';

export class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			repPassword: '',
			firstName: '',
			lastName: '',
			passMismatch: false
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRepPasswordChange = this.handleRepPasswordChange.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.showLoginPage = this.showLoginPage.bind(this);			
		this.handleSubmit = this.handleSubmit.bind(this);
		this.viewHomepage = this.viewHomepage.bind(this);
	};

	viewHomepage() {
		this.props.return();
	};

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	};

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	};

	handleRepPasswordChange(event) {
		this.setState({repPassword: event.target.value});
	};

	handleFirstNameChange(event) {
		this.setState({firstName: event.target.value});
	};
	
	handleLastNameChange(event) {
		this.setState({lastName: event.target.value});
	};

	showLoginPage() {
		this.props.viewLogin();
	};

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.password === this.state.repPassword) {
			this.submitUser();
		} else {
			this.setState({
				passMismatch: true,
				password: '',
				repPassword: ''
			});
		};
	};

	submitUser() {
		const newUser = {
			username: this.state.username,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};

		const newUserInfo = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		};

		fetch('/auth/v1/signup', newUserInfo)
		.then((response) => response.json())
		.then((response) => {
			if (response.data) {
				console.log(response);
				const userData = response.data;
				delete userData['password'];
				console.log("Successfully created new user");

				localStorage.setItem('user', JSON.stringify(userData));
				this.setState({
					username: '',
					password: '',
					repPassword: '',
					firstName: '',
					lastName: '',
					passMismatch: false
				});
				this.props.updateState();
				this.viewHomepage();
			} else {
				console.log("Oops - unable to sign up");
			};
		})
		.catch(err => {
			console.log("Error creating new user");
			console.log(err);
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Username:
					<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
					</label>
					<label>Password:
					<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
					</label>
					<label>Retype Password:
					<input type="password" value={this.state.repPassword} onChange={this.handleRepPasswordChange}/>
					</label>
					<label>First Name:
					<input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
					</label>
					<label>Last Name:
					<input type="text" value={this.state.lastName} onChange={this.handleLastNameChange}/>
					</label>
					<input type="submit" value="Submit"/>
					{ this.state.passMismatch &&
						<h2>Passwords need to match</h2>
					}
				</form>
				<div onClick={this.showLoginPage}>Login</div>
			</div>	)
	};
};
