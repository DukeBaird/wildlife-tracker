import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

export class NewSighting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: '',
            location: '',
            time: '',
            image: ''
        }
        this.handleAnimalChange = this.handleAnimalChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleAnimalChange(event) {
        this.setState({animal: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const newSighting = {
            animal: this.state.animal,
            location: this.state.location,
            time: new Date()
        };

        const newSightingInfo = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',          
            },
            body: JSON.stringify(newSighting)
        };

        //console.log(newSightingInfo);

        fetch('/sighting', newSightingInfo)
        .then(response => {
            response.json();
            console.log(response);
        })
        .then(this.props.return)
        .catch(err => {
            console.log("addSighting caught error")
            console.log(err);
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Animal:
                    <input type="text" value={this.state.animal} onChange={this.handleAnimalChange} />
                </label>
                <label>
                    Location:
                    <input type="text" value={this.state.location} onChange={this.handleLocationChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )}
};