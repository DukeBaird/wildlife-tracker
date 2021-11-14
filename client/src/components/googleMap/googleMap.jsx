import React from 'react';
import ReactDOM from 'react-dom';
import {Loader} from '@googlemaps/js-api-loader';
import './googleMap.sass';

/* eslint-disable import/no-unresolved */
const { mapsAPIKey } = require('../../../config');
/* eslint-enable import/no-unresolved */

const loader = new Loader({
	apiKey: mapsAPIKey,
	version: "weekly"
});

export class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			location: null
		};

		this.mapRef = React.createRef();
		this.createDisplayMap = this.createDisplayMap.bind(this);
		this.createSightingMap = this.createSightingMap.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
		this.addMarker = this.addMarker.bind(this);
		this.showMarkers = this.showMarkers.bind(this);
		this.hideMarkers = this.hideMarkers.bind(this);
		this.deleteMarkers = this.deleteMarkers.bind(this);
		this.updateLocationMarker = this.updateLocationMarker.bind(this);
		this.addEventListener = this.addEventListener.bind(this);
	};

	//Creates a new marker on the map, updates state with the new marker
	addMarker(location, map) {
		const newMarker = new google.maps.Marker({
			position: location,
		});

		const marker = this.state.markers;
		marker.push(newMarker);
		this.setState({ markers: marker });
		this.showMarkers(map);
	}

	//Shows all markers in state on the map
	showMarkers(map) {
		console.log("running show markers");
		const markers = this.state.markers;
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	//Removes all markers from the map, keeps in state
	hideMarkers() {
		console.log("running hide markers");
		this.showMarkers(null);
	}

	//Removes all markers from map and clears state
	deleteMarkers() {
		console.log("running delete markers");
		this.hideMarkers();
		this.setState({ markers: [] });
	}

	//Updates the marker location on the map and removes the previous markers
	updateLocationMarker(location, map) {
		console.log("running update location markers");
		this.deleteMarkers();
		this.addMarker(location, map);
	}

	createMarkers(map) {
		console.log("running createMarkers");
		const sightings = this.props.sightings;
		if (!sightings || sightings.length < 0) return null;

		sightings.forEach(element => {
			const defaultLocation = { lat: 45.63177710291909, lng: -79.71027154237892 };	
			
			let location;
			try {
				location = JSON.parse(element.location);
			}
			catch(err) {
				location = defaultLocation;
			}

			const marker = new google.maps.Marker({
				position: location,
				map: map
			});

			//Some test DB entries don't have users assigned to them
			let popUpInfo;
			/*if (element.spottedBy) {
				popUpInfo = '<div><h1>' + element.animal + '</h1><h3>' + element.spottedBy + '</h3></div>';
			} else {
				popUpInfo = '<div><h1>' + element.animal + '</h1><h3>Mystery User</h3></div>';
			}*/
			
			element.spottedBy ? popUpInfo = `<div><h1>${element.animal}</h1><h3>${element.spottedBy}</h3></div>`
			: popUpInfo = `<div><h1>${element.animal}</h1><h3>Mystery User</h3></div>`;
			

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
			console.log("Creating sighting Map");
			let createMap = new google.maps.Map(this.mapRef.current, {
				center: { lat: 45.63177710291909, lng: -79.71027154237892 },
				zoom: 15,
			});

			//Add a marker whenever you click on the map
			const marker = new google.maps.Marker({
				position: this.props.location,
			});
			marker.setMap(createMap);

			/*
			Need a way to pass createMap into the event listener function
			Right now location (2nd parameter to udateLocation Marker) is always undefined
			*/

			google.maps.event.addListener(createMap, 'click', (event) => {
/* 				this.setState({ location: event.latLng });

				this.addEventListener(event, this)
				this.updateLocationMarker(event.latLng, event.target); */

				//Pass location back to previous state if requested
				if (this.props.onClick) {
					this.props.onClick(event.latLng)
				}
				console.log("Done with event Listener");
			});
			//google.maps.event.addListener(createMap, 'click', this.addEventListener(event, createMap));

		});
	};

	addEventListener(event, map) {
		this.updateLocationMarker(event.latLng, map);
		if (this.props.onClick) {
			this.props.onClick(event.latLng)
		}
		console.log("Done with event Listener");
		console.log(this.state.markers);
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
