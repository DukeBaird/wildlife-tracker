import React from 'react';
import ReactDOM from 'react-dom';
import {SightingAsText} from '../sightingAsText/sightingAsText.jsx';
import './profile.sass';

//const URLSearchParams  = require('url');
//const URL = require('url').URL;

export class Profile extends React.Component {
	constructor(props) {
		super(props); // Props: username, id
		this.state = {
			sightings: []
		};
	};

	//Load sightings using seenBy
	componentDidMount() {
		const fetchInfo = {
			method: 'get',
			// credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
		};

		console.log("Getting users sightings");

		fetch(`/api/v1/sighting?id=${encodeURIComponent(this.props.id)}`, fetchInfo)
		.then((response) => response.json())
		.then((data) => {
			console.log("User Profile loading sightings....");
			console.log(data)
			this.setState({
				sightings: data.data
			});
			console.log("...Loaded");
		})
		.catch((err) => {
			if (err) {
				console.log('error in Profie componentDidMount');
				console.log(err);
			};
		});
	};

	renderSightings(){
		const {sightings} = this.state;
		if (!sightings || sightings.length < 0) return null;

		const user = localStorage.getItem('user');
		const JSONuser = JSON.parse(user);
		console.log('profile rendering sightings');

		const SATList = []; //Create list of SightingAsText elements
		sightings.forEach(element => {
			SATList.push(
				<SightingAsText user={JSONuser} sighting={element} />
			)}
		);
		return SATList;
	};

	render() {
		return (
			<div>
				<h1>{this.props.username}</h1>
				<div>
					{this.renderSightings()}
				</div>
			</div>
		)
	}
}
