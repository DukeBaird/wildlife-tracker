import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header.jsx';
import {AnimalSet} from './animalSet.jsx';
import '../style.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {sightings: [sight, sight1, sight2]};
		this.addSighting = this.addSighting.bind(this);
		this.showAnimals = this.showAnimals.bind(this);
	}


	renderSightings(){
		const {sightings} = this.state;
		if (!sightings | sightings.length < 0) return null;
		//const total = [sight, sight1, sight2];
		const SATList = []; //Create list of SightingAsText elements
		for (let i = 0; i < sightings.length; i+=1) {
			SATList.push(
				<SightingAsText user={person} sighting={sightings[i]} />
			);
		}
		return SATList;
	};

	addSighting() {
		console.log("Clicked Sighting");
		this.setState(state => ({
			sightings: [...state.sightings, sight]
		}));
	}

	showAnimals() {
		console.log("Showing animals");
		const {sightings} = this.state;
		if (!sightings | sightings.length < 0) return null;
		const animals = {};

		//Create "set" of animals
		for (let i = 0; i < sightings.length; i+=1) {
			let sight = sightings[i];
			if (sight.animal in animals) {
				//console.log('animal exists');
				animals[`${sight.animal}`].push(sight.location);
			} else {
				//console.log('new animal');
				animals[`${sight.animal}`] = [sight.location];
			} 

		};

		const animalList = [];
		for (let i in animals) {
			//console.log(animals[i]);
			animalList.push(
			<AnimalSet animal={i} locations={animals[i]}/>
			);
		}

		return animalList;


		//const animalSet = new Set(sightings);
		//console.log(sightings[1].animal);
		//console.log(animals);
	}

	render() {
		return (
			<div>
				<h1>Ahmic Animals</h1>
				<Header addSighting={this.addSighting} showAnimals={this.showAnimals} />
				<h1>MAP GOES HERE</h1>
				{this.renderSightings()}
				{/* {this.showAnimals()} */}
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
		<div className="SightingAsText">
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
	location: "Kitchen",
	time: "Now",
	img: "./cat.jpg"
};

const sight1 = {
	animal: "Dog",
	location: "Outside",
	time: "Now",
	img: "./cat.jpg"
};	

const sight2 = {
	animal: "Cat",
	location: "Desk",
	time: "Yesterday",
	img: "./cat.jpg"
};	



console.log("Running!");

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);