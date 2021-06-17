import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

export class AnimalSet extends React.Component {
    constructor(props) {
        super(props)
        this.addLocations = this.addLocations.bind(this);
    };

    addLocations() {
        const loc = this.props.locations;
        console.log(loc);
        const locList = loc.map((location) =>
            <div key={location}>{location}</div>
        );
        //console.log("Adding Locations")
/*         for (let i = 0; i < this.props.locations.length; i+=1 ) {
            loc.push(
                <div>{this.props.locations[i]}</div>
            );
        }; */

        return locList;
    }

    render() {
        return (
            <div>
                <h1>{this.props.animal}</h1>
                <div>Seen at:</div>
                <span>
                    {this.addLocations()}
                </span>
            </div>
        );
    };



}