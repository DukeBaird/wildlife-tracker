import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header.jsx';
import {AnimalLocations} from './animalLocations.jsx';
import {NewSighting} from './addSighting.jsx';
import {SightingAsText} from './components/sightingAsText/sightingAsText.jsx';
import '../style.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sightings: [],
			showing: "sight"
		
		};
		this.viewHomepage = this.viewHomepage.bind(this);
		this.addSighting = this.addSighting.bind(this);
		this.viewAnimals = this.viewAnimals.bind(this);
		this.createNewSighting = this.createNewSighting.bind(this);

	}

	componentDidMount() {
		fetch('/api/v1/sighting')
		.then((response) => response.json())
		.then((data) => {
			console.log("Refresh loading sightings....");
			console.log(data)
			this.setState({
				sightings: data.data
			});
			console.log("...Loaded");
			console.log(this.state.sightings);
		})
		.catch((err) => {
			if (err) {
				console.log('error in componentDidMount');
				console.log(err);
			};
		});
	};

	renderSightings(){
		const {sightings} = this.state;
		if (!sightings | sightings.length < 0) return null;
		const SATList = []; //Create list of SightingAsText elements
		sightings.forEach(element => {
			SATList.push(
				<SightingAsText user={person} sighting={element} />
			)}
		);

		return SATList;
	};

	viewHomepage() {
		console.log("Clicked Home");

		//Get any updated sightings from db
		fetch('/api/v1/sighting')
		.then((response) => response.json())
		.then((data) => {
			console.log('Homepage loading sightings...');
			this.setState({ 
				sightings: data.data
			});
			console.log('...Loaded');
		})
		.catch((err) => {
			if (err) console.log(err);
		});

		//Show homepage
		this.setState({
			showing: "sight"
		});
	}

	addSighting() {
		console.log("Clicked Sighting");
		this.setState(state => ({
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
			<AnimalLocations animal={i} locations={animals[i]}/>
			);
		}

		return animalList;
	}

	newSighting() {
		return <NewSighting onSubmit={this.createNewSighting} return={this.viewHomepage}/>
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

//Test Variables
const person = {
	name:"Matt",
	avatarUrl:"fdsfsdf"
};

/* const sight = {
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
 */


console.log("Running!");

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
