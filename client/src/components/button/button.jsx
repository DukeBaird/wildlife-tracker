import React from 'react';
import ReactDOM from 'react-dom';
import './button.sass'

export class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="button" onClick={this.props.handleClick}>{this.props.text}</button>
			)
	}
}
