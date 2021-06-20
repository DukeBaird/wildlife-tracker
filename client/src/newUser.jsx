import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

export class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			repPassword: '',
			firstName: '',
			lastName: ''
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRepPasswordChange = this.handleRepPasswordChange.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.showLoginPage = this.showLoginPage.bind(this);			
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleRepPasswordChange(event) {
		this.setState({repPassword: event.target.value});
	}

	handleFirstNameChange(event) {
		this.setState({firstName: event.target.value});
	}
	
	handleLastNameChange(event) {
		this.setState({lastName: event.target.value});
	}

	showLoginPage() {
		this.props.viewLogin();
	}

	handleSubmit() {
		// TODO
		// Check that passwords match
		// Check that username doesn't already exist
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Username:
					<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
					</label>
					<label>Password:
					<input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
					</label>
					<label>Retype Password:
					<input type="text" value={this.state.rePassword} onChange={this.handleRepPasswordChange}/>
					</label>
					<label>First Name:
					<input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
					</label>
					<label>Last Name:
					<input type="text" value={this.state.lastNname} onChange={this.handleLastNameChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
				<div onClick={this.showLoginPage}>Login</div>
			</div>	)
	}
}

