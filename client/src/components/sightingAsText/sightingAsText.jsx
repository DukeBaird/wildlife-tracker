import React from 'react';
import ReactDOM from 'react-dom';
import {SightingInfo} from '../sightingInfo/sightingInfo.jsx';
import {UserInfo} from '../userInfo/userInfo.jsx';
import {Button} from '../button/button.jsx';

export class SightingAsText extends React.Component {
	constructor(props) {
		super(props);
		this.deleteSighting = this.deleteSighting.bind(this);
	}

	deleteSighting() {
		fetch(`/api/v1/sighting/${this.props.sighting._id}`, {
			method: 'DELETE',
			body: JSON.stringify({ id:this.props.sighting._id })
		})
		.then((response) => {
			response.json();
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
			<div className="SightingAsText">
				<img className="Sighting-Image"
					src={this.props.sighting.img}
					alt={this.props.sighting.animal}
				/>
				<SightingInfo sighting={this.props.sighting} />
				<UserInfo user={this.props.user} />
				<Button handleClick={this.deleteSighting} text="Delete" />
			</div>
		)
	}
}
