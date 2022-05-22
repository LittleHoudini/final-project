/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { Component } from "react";
import { home_page_squares } from "../../data/products";
import CreateSquare from "../createSquare/CreateSquare";
import Styles from "./main.module.css";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Main Screen - Home Page
export default class Main extends Component {
	render() {
		return (
			<main className={Styles.Main}>
				<CreateSquare data={home_page_squares} type="square" />
			</main>
		);
	}
}
