import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header.jsx';
import {AnimalSet} from './animalSet.jsx';
import {NewSighting} from './addSighting.jsx';
import '../style.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sightings: [sight, sight1, sight2],
			showing: "sight"
		
		};
		this.viewHomepage = this.viewHomepage.bind(this);
		this.addSighting = this.addSighting.bind(this);
		this.viewAnimals = this.viewAnimals.bind(this);
		this.createNewSighting = this.createNewSighting.bind(this);

	}


	renderSightings(){
		const {sightings} = this.state;
		if (!sightings | sightings.length < 0) return null;
		const SATList = []; //Create list of SightingAsText elements
		sightings.forEach(element =>
			SATList.push(
				<SightingAsText user={person} sighting={element} />
			)
		);

		/* for (let i = 0; i < sightings.length; i+=1) {
			SATList.push(
				<SightingAsText user={person} sighting={sightings[i]} />
			);
		} */
		return SATList;
	};

	viewHomepage() {
		console.log("Clicked Home");
		this.setState({
			showing: "sight"
		});
	}

	addSighting() {
		console.log("Clicked Sighting");
		this.setState(state => ({
			//sightings: [...state.sightings, sight],
			showing: "newSight"
		}));
	}

	viewAnimals() {
		console.log("Clicked Animals");
		this.setState({
			showing: "animals"
		});
	}


	showAnimals() {
		console.log("Showing animals");
		const {sightings} = this.state;
		if (!sightings | sightings.length < 0) return null;

		//Create "set" of animals
		const animals = {};
		sightings.forEach(element => {
			if (animals[element.animal]) {
				animals[element.animal].push(element.location);
			} else {
				animals[element.animal] = [element.location];
			}		
		});

		//Create elements to display from set
		const animalList = [];		
		for (let i in animals) {
			animalList.push(
			<AnimalSet animal={i} locations={animals[i]}/>
			);
		}

		return animalList;
	}

	newSighting() {
		return <NewSighting onSubmit={this.createNewSighting}/>
	}

	createNewSighting(animal, location) {
		const newSight = {
			animal: animal,
			location: location,
			time: "Surprise"
		};

		//Add to sighting state and show all sightings
		this.setState(state => ({
			sightings: [...state.sightings, newSight],
			showing: "sight"
		}));
	}

	render() {
		return (
			<div>
				<h1>Ahmic Animals</h1>
				<Header addSighting={this.addSighting} viewAnimals={this.viewAnimals} viewHomepage={this.viewHomepage} />
				<h1>MAP GOES HERE</h1>

				{/* If showing = sight, render sightings */}
				{this.state.showing === "sight" ? this.renderSightings() 

				// else if showing = animals, show animals
				: this.state.showing === "animals" ? this.showAnimals()

				// else if showing = newSight, show new sighting input
				: this.state.showing === "newSight" ? this.newSighting()

				// Otherwise show null
				: null}
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
