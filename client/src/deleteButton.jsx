import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from './components/button/button.jsx';
import '../style.sass';

export class DeleteButton extends React.Component {
	constructor(props) {
		super(props)
		this.deleteSighting = this.deleteSighting.bind(this);
	};

	deleteSighting() {
		fetch(`/api/v1/sighting/${this.props.id}`, {
			method: 'DELETE',
			body: JSON.stringify({ id:this.props.id })
		})
		.then((response) => {
			response.json();
			logger.info('Deleted!');
		})
		.catch(err => {
			if (err) {
				logger.error(err)
			}
		})
	}

	render() {
		return (
			<Button handleClick={this.deleteSighting} text="Delete" />
		)
	}
}
