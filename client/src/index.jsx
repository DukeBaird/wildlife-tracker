import React from 'react';
import ReactDOM from 'react-dom';

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

function App() {
	return (
		<div>
			<h1>Ahmic Animals</h1>
			<Header />
			<h1>MAP GOES HERE</h1>
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