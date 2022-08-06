/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { Component } from "react";
import components from "../../data/components";
import uuid from "react-uuid";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Create square dynamiclly based on the type given (Type given at runtime)
//Choose data to map over and display
export default class CreateSquare extends Component {
	render() {
		const MyComponent = components[this.props.type];
		//data is the data provided when creating the square
		return this.props.data.map((item) => (
			<div key={uuid()}>
				<MyComponent type={this.props.type} data={item} setClicked={this.props.setClicked} userType={this.props.userType}/>
			</div>
		));
	}
}
