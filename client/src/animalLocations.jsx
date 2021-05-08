import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

export class AnimalLocations extends React.Component {
    constructor(props) {
        super(props)
        this.displayLocations = this.displayLocations.bind(this);
    };

    displayLocations() {
        const loc = this.props.locations;
        console.log(loc);
        const locList = loc.map((location) =>
            <div key={location}>{location}</div>
        );

        return locList;
    }

    render() {
        return (
            <div>
                <h1>{this.props.animal}</h1>
                <div>Seen at:</div>
                <span>
                    {this.displayLocations()}
                </span>
            </div>
        );
    };
}
