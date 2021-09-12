import React from 'react';
import ReactDOM from 'react-dom';
import {Loader} from '@googlemaps/js-api-loader';
import './googleMap.sass';

/* eslint-disable import/no-unresolved */
const config = require('../../../../server/config');
/* eslint-enable import/no-unresolved */

const loader = new Loader({
	apiKey: config.mapsAPIKey,
	version: "weekly"
});

export class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
		this.createMap = this.createMap.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
	};

	createMarkers(map) {
		console.log("running createMarkers");
		const sightings = this.props.sightings;
		console.log(sightings);
		console.log('hope we had some');

		if (!sightings || sightings.length < 0) return null;

		sightings.forEach(element => {
			console.log('location type: ', typeof(element.location));

			let location = { lat: 45.63177710291909, lng: -79.71027154237892 };			
			//Currently commented out as test DB sightings have description locations, not lat/lng
			/* if (element.location) {
				location = element.location;
			} else {
				location = { lat: 45.63177710291909, lng: -79.71027154237892 }
			} */

			const marker = new google.maps.Marker({
				position: location,
				map: map
			});

			let popUpInfo;
			if (element.spottedBy) {
				popUpInfo = '<div><h1>' + element.animal + '</h1><h3>' + element.spottedBy + '</h3></div>';
			} else {
				popUpInfo = '<div><h1>' + element.animal + '</h1><h3>Mystery User</h3></div>';
			}
			
			const infoWindow = new google.maps.InfoWindow({
				content: popUpInfo
			});

			marker.addListener('click', () => {
				infoWindow.open(map, marker)
			});
		});
	};

	createMap() {
		loader.load()
		.then(() => {
			//Create map
			const map = new google.maps.Map(this.mapRef.current, {
				center: { lat: 45.63177710291909, lng: -79.71027154237892 },
				zoom: 15,
			});

			console.log("done creating map");

			//Add markers for all the sightings passed to the map
			this.createMarkers(map);
		});
	};

	render() {
		return (
			<div id="mapContainer" ref={this.mapRef}>
				{this.createMap()}
			</div>
		)
	}
};
