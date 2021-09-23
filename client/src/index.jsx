import React from 'react';
import ReactDOM from 'react-dom';
import {AnimalLocations} from './animalLocations.jsx';
import {NewSighting} from './components/addSighting/addSighting.jsx';
import {Login} from './components/login/login.jsx';
import {SightingAsText} from './components/sightingAsText/sightingAsText.jsx';
import {Profile} from './components/profile/profile.jsx';
import {UserMenu} from './components/userMenu/userMenu.jsx';
import leftButton from './images/left.png';
import rightButton from './images/right.png';
import '../style.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sightings: [],
			showing: "sight",
			page: 0
		};
		this.viewHomepage = this.viewHomepage.bind(this);
		this.addSighting = this.addSighting.bind(this);
		this.viewAnimals = this.viewAnimals.bind(this);
		this.viewLogin = this.viewLogin.bind(this);
		this.viewProfile = this.viewProfile.bind(this);
		this.createNewSighting = this.createNewSighting.bind(this);
		this.updateUserState = this.updateUserState.bind(this);
		this.renderPreviousPage = this.renderPreviousPage.bind(this);
		this.renderNextPage = this.renderNextPage.bind(this);
		this.buildPaginationButtons = this.buildPaginationButtons.bind(this);
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
			const user = localStorage.getItem('user');
			console.log(user);
			if (user) {
				const userJSON = JSON.parse(user);
				this.setState({
					user: userJSON.username
				});
			} else {
				this.setState({
					user: false
				});
			};
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
		if (!sightings || sightings.length < 0) return null;
		const SATList = []; //Create list of SightingAsText elements
		SATList.push(
			<div className='MapContainer'>
					<h1>MAP GOES HERE</h1>
			</div>
		)
		sightings.forEach(element => {
			SATList.push(
				<SightingAsText user={person} sighting={element} />
			)}
		);

		SATList.push(this.buildPaginationButtons());

		return SATList;
	};

	viewHomepage() {
		console.log("Clicked Home");
		console.log(`Loading page ${this.state.page}`);

		const fetchInfo = {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		//Get any updated sightings from db
		fetch(`/api/v1/sighting?page=${encodeURIComponent(this.state.page)}`, fetchInfo)
		.then((response) => response.json())
		.then((data) => {

			// Debugging
			if (!data) {
				console.log('No data returned from fetch');
			};

			console.log('Button push loading sightings...');
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

	viewLogin() {
		console.log("Clicked Login");
		this.setState({
			showing: "login"
		});
	}

	viewProfile() {
		console.log("Clicked profile");
		this.setState({
			showing: 'profile'
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
		animalList.push(
			<div className='MapContainer'>
					<h1>MAP GOES HERE</h1>
			</div>
		);	
		for (let i in animals) {
			animalList.push(
			<AnimalLocations animal={i} locations={animals[i]}/>
			);
		}

		return animalList;
	}

	showProfile() {
		console.log('Showing Profile');
		const user = localStorage.getItem('user');
		const JSONuser = JSON.parse(user);
		if (user) {
			const profileDivs = [];
			profileDivs.push(
				<div className='MapContainer'>
					<h1>MAP GOES HERE</h1>
				</div>
			);
			profileDivs.push(
				<Profile username={JSONuser.username} id={JSONuser._id} />
			);

			return profileDivs;
		}

		//Should never get here, but just in case, show the homepage
		console.log('UH OH VIEWING HOME');
		return this.viewHomepage()
	}

	showLogin() {
		return <Login onLogin={this.updateUserState} return={this.viewHomepage} />
	}

	updateUserState() {
		console.log("App is updating user state");
		const user = localStorage.getItem('user');
		if (user) {
			const userJSON = JSON.parse(user);
			this.setState({
				user: userJSON.username
			});
		} else {
			this.setState({
				user: ''
			});
		};
	};

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

	renderPreviousPage() {
		if (this.state.page > 0) {
			this.setState({
				page: this.state.page -= 1
			});
		} else {
			console.log('Already on the first page');
		}
		this.viewHomepage(); // this should be renamed or a new function created if we want a button to reset state.page = 0
	}

	renderNextPage() {
		// Quality checks for too many pages?
		console.log('loading next page');
		//const nextPage = this.state.page + 1;
		this.setState({
			page: this.state.page += 1
		});
		this.viewHomepage();
	}

	buildPaginationButtons() {
		let backButton;
		if (this.state.page === 0) {
			backButton = <img src={leftButton} alt="Backwards" onClick={null}/>
		} else {
			backButton = <img src={leftButton} alt="Backwards" onClick={this.renderPreviousPage}/>
		}

		let forwardButton;
		if (this.state.sightings.length < 5) {
			forwardButton = <img src={rightButton} alt="Forwards" onClick={null}/>
		} else {
			forwardButton = <img src={rightButton} alt="forwards" onClick={this.renderNextPage}/>
		}

		const pageButtons = [];
		pageButtons.push(
			<div className="PageButtons">
				{backButton}
				{forwardButton}
			</div>
		);

		return pageButtons

	}

	render() {
		return (
			<div id='App'>
				<div className='logoButton'>
					<div className='TopBar'>
						Logo to go here
					</div>
				</div>
				<div className='Main'>
					<div className='TopBar'>
						<div className='titleContainer'>
							<h1 className='title' onClick={this.viewHomepage}>Ahmic Animals</h1>
						</div>
					</div>

					{/* If showing = sight, render sightings */}
					{this.state.showing === "sight" ? this.renderSightings() 

					// else if showing = animals, show animals
					: this.state.showing === "animals" ? this.showAnimals()

					// else if showing = newSight, show new sighting input
					: this.state.showing === "newSight" ? this.newSighting()

					: this.state.showing === "profile" ? this.showProfile()

					: this.state.showing === "login" ? this.showLogin()

					// Otherwise show null
					: null}
				</div>
				<div className='AddButtons'>
					<div className='TopBar'>
						<UserMenu 
							user={this.state.user}
							viewHome={this.viewHomepage}
							viewLogin={this.viewLogin}
							viewProfile={this.viewProfile}
							onLogout={this.updateUserState}
							addSighting={this.addSighting}
							viewAnimals={this.viewAnimals}
						/>
					</div>
				</div>
			</div>
		);
	};
}		

//Test Variables
const person = {
	username:"Matt",
	avatarUrl:"fdsfsdf"
};

console.log("Running!");

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
