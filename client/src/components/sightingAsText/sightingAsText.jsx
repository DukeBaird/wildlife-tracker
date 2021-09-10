import React from 'react';
import ReactDOM from 'react-dom';
import {SightingInfo} from '../sightingInfo/sightingInfo.jsx';
import {UserInfo} from '../userInfo/userInfo.jsx';
import {Button} from '../button/button.jsx';
import noImage from '../../images/noImage.jpg';
import userLogo from '../../images/userLogo.png';
import pinLogo from '../../images/pin.png';
import './sightingAsText.sass';

export class SightingAsText extends React.Component {
	constructor(props) {
		super(props);
		this.deleteSighting = this.deleteSighting.bind(this);
		this.buildDate = this.buildDate.bind(this);
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

	buildDate() {
		//Parse Date string into new Date variable
		let sightingTime = new Date(this.props.sighting.time.split(' ')[0]);

		//Get values that people can read easily
		const date = sightingTime.toDateString();
		const time = sightingTime.toTimeString()

		//Remove timezone
		const reducedTime = time.split(' ')[0];

		const display = [];
		display.push(
			<div id="time">
				{date}
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
				<div className="cardTextContainer">
					<div>
						<div id="mainTitle">{this.props.sighting.animal}</div>
						<div id="cardLocation">
							<img id="locPin" src={pinLogo} alt="locPin" />
							<div>{this.props.sighting.location}</div>
						</div>
					</div>
					<div id="secondaryText">
						<div id="cardUser">
							<img id="cardUserLogo" src={userLogo} alt="UserLogo" />
							<div id="cardUsername">
								{userRender}
							</div>
						</div>
						{this.buildDate()}
					</div>
				</div>
				<div className="cardImageContainer">
					<img className="Sighting-Image"
						src={animalPicture}
						alt="Picture of Animal"
					/>
				</div>
			</div>
		)
	}
}
