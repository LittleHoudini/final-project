/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { Component } from "react";
import Styles from "./adminpanel.module.css";

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/
//Creates a grid of admin functions
export default class AdminMain extends Component {
	render() {
		const { title } = this.props.data;
		return (
			<div className={Styles.wrapper3}>
				<button className={Styles.btn}>{title}</button>
			</div>
		);
	}
}
