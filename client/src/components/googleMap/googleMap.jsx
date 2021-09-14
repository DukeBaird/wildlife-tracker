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
		this.state = {
			markers: []
		};

		this.mapRef = React.createRef();
		this.createDisplayMap = this.createDisplayMap.bind(this);
		this.createSightingMap = this.createSightingMap.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
		this.addMarker = this.addMarker.bind(this);
	};

	addMarker(location, map) {
		new google.maps.Marker({
			position: location,
			map: map
		});
	}

	createMarkers(map) {
		console.log("running createMarkers");
		const sightings = this.props.sightings;
		if (!sightings || sightings.length < 0) return null;

		sightings.forEach(element => {
			const elemLocation = ('' + element.location).slice(1);
			const defaultLocation = { lat: 45.63177710291909, lng: -79.71027154237892 };	

			//Currently commented out as test DB sightings have description locations, not lat/lng
/* 			try {
				location = JSON.parse(element.location);
			}
			catch(err) {
				location = defaultLocation;
			} */
			let location;	
			if (elemLocation.length < 50) {
				location = defaultLocation;
			} else {
				location = JSON.parse(elemLocation);
			}

			const marker = new google.maps.Marker({
				position: location,
				map: map
			});

			//Some test DB entries don't have users assigned to them
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

	createDisplayMap() {
		loader.load()
		.then(() => {
			//Create map
			const map = new google.maps.Map(this.mapRef.current, {
				center: { lat: 45.63177710291909, lng: -79.71027154237892 },
				zoom: 15,
			});

			//console.log("done creating map");

			//Add markers for all the sightings passed to the map
			this.createMarkers(map);
		});
	};

	createSightingMap() {
		loader.load()
		.then(() => {
			//Create map
			const map = new google.maps.Map(this.mapRef.current, {
				center: { lat: 45.63177710291909, lng: -79.71027154237892 },
				zoom: 15,
			});

			const marker = new google.maps.Marker({
				position: this.props.location,
			});
			marker.setMap(map);

			console.log("done creating map");

			//Add a marker whenever you click on the map
			google.maps.event.addListener(map, 'click', (event) => {
/* 				//Delete existing marker
				const delMarkers = this.state.markers;
				console.log("delMarkers set")
				for (let i = 0; i < delMarkers.length; i++) {
					delMarkers[i].setMap(null);
				}
				this.setState({ markers: [] });
				
				//Create new marker and push to state
				const newMarker = new google.maps.Marker({
					position: event.latLng,
					map: map
				});

				this.setState({ markers: [newMarker] });

				//Add marker to map
				const createMarker = this.state.markers;
				for (let i = 0; i < createMarker.length; i++) {
					console.log("Adding marker with setMap");
					createMarker[i].setMap(map);
				}; */

				//Pass location back to previous state if requested
				if (this.props.onClick) {
					this.props.onClick(event.latLng)
				};
			});
		});
	};


	render() {
		return (
			<div id="mapContainer" ref={this.mapRef}>
				{this.props.view === 'display' ? this.createDisplayMap()
				: this.props.view === 'create' ? this.createSightingMap()
				: null}
			</div>
		)
	}
};
