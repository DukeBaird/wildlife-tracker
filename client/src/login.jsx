import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);		
		this.handleSubmit = this.handleSubmit.bind(this);

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

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Username:
				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
				</label>
				<label>Password:
				<input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
				</label>
				<input type="submit" value="Submit"/>
			</form>	)
	}
}
