import React from 'react';
import ReactDOM from 'react-dom';
import '../style.sass';

const element = <h1 className='test'>Hello, world</h1>;

console.log("Running!");


ReactDOM.render(
	element, 
	document.getElementById('root')
);