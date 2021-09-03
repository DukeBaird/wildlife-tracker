import React from 'react';
import ReactDOM from 'react-dom';
import {SightingInfo} from '../sightingInfo/sightingInfo.jsx';
import {UserInfo} from '../userInfo/userInfo.jsx';
import {Button} from '../button/button.jsx';
import noImage from './noImage.jpg';
import './sightingAsText.sass';

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
		let animalPicture;
		if (this.props.sighting.img) {
			animalPicture = this.props.sighting.img;
		} else {
			animalPicture = noImage;
		}


		return (
			<div className="SightingAsText">
				<div className="UserContainer">
					<UserInfo user={this.props.user} />
					<Button handleClick={this.deleteSighting} text="Delete" />
				</div>
				<SightingInfo sighting={this.props.sighting} />
				<div className="ImageContainer">
					<img className="Sighting-Image"
						src={animalPicture}
						alt="Picture of Animal"
					/>
				</div>
			</div>
		)
	}
}
