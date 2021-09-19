import React from 'react';
import ReactDOM from 'react-dom';
import './animalLocations.sass';

export class AnimalLocations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: []
		};
		this.displayLocations = this.displayLocations.bind(this);
		this.buildDivFromArray = this.buildDivFromArray.bind(this);
	};

	componentDidMount() {
		fetch('/api/v1/animals')
		.then((response) => response.json())
		.then((data) => {
			console.log("Received locations");
			console.log(data);
			this.setState({
				animals: data.data
			});
		});
	};

	displayLocations() {
		console.log("Displaying Locations");
		const animals = [];
		const animalState = this.state.animals;
		animalState.forEach((element) => {
			const userDiv = this.buildDivFromArray(element.users);
			const locDiv = this.buildDivFromArray(element.locations);

			let returnDiv = <div className="animalLoc"> 
				<h1>{element._id}</h1>
				<div className="seenDiv">
					<div className="seenDescription">Seen at:</div>
					<div>{locDiv}</div>
				</div>
				<div className="seenDiv">
					<div className="seenDescription">Seen by:</div>
					<div>{userDiv}</div>
				</div>
			</div>

			animals.push(returnDiv);
		});

		return animals;

	};

	buildDivFromArray(inputList) {
		const returnDiv = []
		inputList.forEach((item) => {
			returnDiv.push(<span>{item} </span>);
		});
		return returnDiv;
	};

	render() {
		return (
			<div>
				<h1>Animal Specifics</h1>
				<span>
					{this.displayLocations()}
				</span>
			</div>
		);
	};
}
