import React from 'react';
import ReactDOM from 'react-dom';
import {SightingInfo} from '../sightingInfo/sightingInfo.jsx';
import {UserInfo} from '../userInfo/userInfo.jsx';
import {Button} from '../button/button.jsx';
import noImage from '../../images/noImage.jpg';
import './sightingAsText.sass';

export class SightingAsText extends React.Component {
	constructor(props) {
		super(props);
		this.deleteSighting = this.deleteSighting.bind(this);
		this.buildDateAndLocation = this.buildDateAndLocation.bind(this);
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

	buildDateAndLocation() {
		//Parse Date string into new Date variable
		let sightingTime = new Date(this.props.sighting.time.split(' ')[0]);

		//Get values that people can read easily
		const date = sightingTime.toDateString();
		const time = sightingTime.toTimeString()

		//Remove timezone
		const reducedTime = time.split(' ')[0];

		const display = [];
		display.push(
			<div id="secondaryText">
				<div id="location">
					{this.props.sighting.location}
				</div>
				<div id="time">
					{date}
				</div>
			</div>
		);

		return display;
	}

	render() {
		let animalPicture;
		if (this.props.sighting.img) {
			animalPicture = this.props.sighting.img;
		} else {
			animalPicture = noImage;
		}
		
		let userRender;
		if (this.props.sighting.spottedBy) {
			userRender = this.props.sighting.spottedBy;
		} else {
			userRender = 'Mystery Vistor'
		}

		return (
			<div className="SightingAsText">
				<div className="cardTitleContainer">
					<div id="mainTitle">{this.props.sighting.animal}</div>
					{this.buildDateAndLocation()}
				</div>
				<div className="cardImageContainer">
					<img className="Sighting-Image"
						src={animalPicture}
						alt="Picture of Animal"
					/>
				</div>
				<div id="cardUser">			
					{userRender}
				</div>
			</div>
		)
	}
}
