import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '../button/button.jsx';
import './animalLocations.sass';

export class AnimalLocations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			showMap: false,
			mapAnimal: ""
		};
		this.displayLocations = this.displayLocations.bind(this);
		this.buildDivFromArray = this.buildDivFromArray.bind(this);
		this.viewMap = this.viewMap.bind(this);
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
		const animals = [];
		const animalState = this.state.animals;
		animalState.forEach((element) => {
			const userDiv = this.buildDivFromArray(element.users);
			const animal = element._id;

			let locCard = 
				<div className="animalLoc">
					<div className="image">Image Placeholder</div>
					<h1>{animal}</h1>
					<div className="seenDiv">
						<div className="locUserContainer">
							<div className="seenDescription">USER LOGO</div>
							<div>{userDiv}</div>
						</div>
						<div className="mapButton" onClick={() => {
							if (this.state.showMap === true && this.state.mapAnimal === animal) {
								this.setState({
									showMap: false,
									mapAnimal: ""
								})
							} else {
								this.setState({
									showMap: true,
									mapAnimal: animal
								});
							}
						}}>
							View Locations</div>
					</div>
				</div>

			animals.push(locCard);

			if (this.state.showMap === true && this.state.mapAnimal === animal) {
				animals.push(<div className="locMapContainer">MAP PLACEHOLDER - {this.state.mapAnimal}</div>)
			}
		});

		return animals;

	};

	viewMap(element) {
		console.log("Clicked view map - need map branch to merge");
		console.log(element._id);
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
