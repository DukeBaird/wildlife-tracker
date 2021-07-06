import React from 'react';
import ReactDOM from 'react-dom';
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
			response.json(); // This line is identified as the problem line in dev tools
			console.log('Deleted!');
		})
		.catch(err => {
			if (err) {
				console.log(err)
			}
		})
	}

	render() {
		return (
			<button onClick={this.deleteSighting}>Delete</button>
		)
	}
}
