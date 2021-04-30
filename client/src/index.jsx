import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header.jsx';
import '../style.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {sightingCount: 0};
		this.addSighting = this.addSighting.bind(this);
	}


	renderSightings(){
		const {sightingCount} = this.state;
		if (!sightingCount | sightingCount < 0) return null;
		const total = []
		for (let i = 0; i < sightingCount; i+=1) {
			total.push(
				<SightingAsText user={person} sighting={sight} />
			);
		};
		return total;
	};

	addSighting() {
		console.log("Clicked Sighting");
		this.setState(state => ({
			sightingCount: state.sightingCount + 1
		}));
	}

	render() {
		return (
			<div>
				<h1>Ahmic Animals</h1>
				<Header addSighting={this.addSighting} />
				<h1>MAP GOES HERE</h1>
				{this.renderSightings()}
			</div>
		);
	};
}		

//Display user profile picture (if loaded)
function Avatar(props) {
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>		
	);
}

//Include user's name below their profile picture
function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-Name">
				{props.user.name}
			</div>
		</div>		
	);
}

//SightingInfo
function SightingInfo(props) {
	return (
		<div>
			<h2>{props.sighting.animal}</h2>
			<h4>{props.sighting.location}</h4>
			<h4>{props.sighting.time}</h4>	
		</div>	
	);
}

//List version of a sighting
function SightingAsText(props) {
	return (
		<div className="SightingList">
			<img className="Sighting-Image"
				src={props.sighting.img}
				alt={props.sighting.animal}
			/>
			<SightingInfo sighting={props.sighting} />
			<UserInfo user={props.user} />
		</div>		
	);
}

//Test Variables
const person = {
	name:"Matt",
	avatarUrl:"fdsfsdf"
};

const sight = {
	animal: "Cat",
	location: "Desk",
	time: "Now",
	img: "./cat.jpg"
};

console.log("Running!");

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);