import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

//Nav bar at top of page
function Header() {
	return (
		<span>
			<button onClick={viewHome}>Home</button>
			<button onClick={viewUser}>User</button>
			<button onClick={viewAnimals}>Animals</button>
			<button onClick={addSighting}>Add Sighting</button>
		</span>
	);
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
function SightingList(props) {
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
	img: "fdsdfsd"
};

//const testsight = SightingList(sighting=sight, user=person);



function App() {
	return (
		<div>
			<h1>Ahmic Animals</h1>
			<Header />
			<h1>MAP GOES HERE</h1>
			<SightingList user={person} sighting={sight} />
			<SightingList user={person} sighting={sight} />
			<SightingList user={person} sighting={sight} />
		</div>
	);
}		

const element = <h1>Hello, world</h1>;

console.log("Running!");


//Event handlers for Header
function viewHome() {
	console.log("Clicked Home");
}

function viewUser() {
	console.log("Clicked User");
}

function viewAnimals() {
	console.log("Clicked Animals");
}

function addSighting() {
	console.log("Clicked Sighting");
}





ReactDOM.render(
	<App />, 
	document.getElementById('root')
);