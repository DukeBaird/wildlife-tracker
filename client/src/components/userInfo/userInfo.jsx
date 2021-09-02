import React from 'react';
import ReactDOM from 'react-dom';

export class UserInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="UserInfo">
{/* 				<img className="Avatar"
					src={this.props.user.avatarUrl}
					alt={this.props.user.name}
				/>	 */}
				<div className="UserInfo-Name">
					{this.props.user.username}
				</div>
			</div>		
		);
	}
}
