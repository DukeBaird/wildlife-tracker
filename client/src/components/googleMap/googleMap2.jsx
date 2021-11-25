import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { Marker } from '../marker/marker.jsx';
import './googleMap.sass';

/* eslint-disable import/no-unresolved */
const { mapsAPIKey } = require('../../../config');
/* eslint-enable import/no-unresolved */


export class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			location: null,
			center: {
				lat: 45.63177710291909,
				lng: -79.71027154237892
			},
			loading: true
		};

		this.mapRef = React.createRef();
		this.createDisplayMap = this.createDisplayMap.bind(this);
		this.createSightingMap = this.createSightingMap.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			//Success function
			(position) => {
				const {latitude, longitude} = position.coords;

				this.setState({
					center: {
						lat: latitude,
						lng: longitude
					},
					loading: false
				})
				console.log("Updated location!");
			},
			//Error function
			() => {
				this.setState({ loading: false });
			}
		);
	}

	createMarkers() {
		console.log("running createMarkers");
		const sightings = this.props.sightings;
		if (!sightings || sightings.length < 0) return null;
		
		const markers = [];

		sightings.forEach(element => {			
			let location;
			try {
				location = JSON.parse(element.location);
			}
			catch(err) {
				location = this.props.center;
			}

			const marker = {
				position: location,
				data: element
			};

			//Some test DB entries don't have users assigned to them - call them Mystery Users -- PUT INTO INFOBOX COMPONENT
			const popUpInfo = `<div><h1>${element.animal}</h1><h3>${ element.spottedBy ? element.spottedBy : 'Mystery User'}</h3></div>`;		
			
			markers.push(marker);
		});
		console.log("Complete createMarkers");
		return markers;
	};

	createDisplayMap() {
		const markers = this.createMarkers();
		console.log(markers);
		return <GoogleMapReact
					bootstrapURLKeys = {{
						key: mapsAPIKey,
						language: 'en'
					}}
					defaultCenter = {this.props.center}
					defaultZoom = {this.props.zoom}
					center = {this.state.center}
					
					>

					{markers.map((marker, i) => <Marker 
													lat={marker.position.lat}
													lng={marker.position.lng}
													info={marker.data}
													key={i} 
												/>)}

				</GoogleMapReact>;
	};

	getNewCenter = ({ center }) => {
		console.log('onChange', center);
		this.setState({
			center: center
		});
	}


	createSightingMap() {
		//Create map
		console.log("Creating sighting Map");

		return <GoogleMapReact
					bootstrapURLKeys = {{
						key: mapsAPIKey,
						language: 'en'
					}}
					defaultCenter = {this.props.center}
					defaultZoom = {this.props.zoom}
					center = {this.state.center}
					onDrag = {this.getNewCenter}
					//onChange = {this.getNewCenter}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
					>

					<Marker
						lat={this.state.center.lat}
						lng={this.state.center.lng}
					/>

				</GoogleMapReact>
	};

	render() {
		const { loading } = this.state;

		if (loading) {
			console.log("Still loading!");
			return null;
		}

		console.log("Done Loading!");

		return (
			<div id="mapContainer" ref={this.mapRef}>
				{this.props.view === 'display' ? this.createDisplayMap()
				: this.props.view === 'create' ? this.createSightingMap()
				: null}
			</div>
		)
	}
};

GoogleMap.defaultProps = {
	center: {
		lat: 45.63177710291909,
		lng: -79.71027154237892
	},
	zoom: 15
};