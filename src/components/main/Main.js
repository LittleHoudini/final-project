/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useState, useEffect } from "react";
import CreateSquare from "../createSquare/CreateSquare";
import Styles from "./main.module.css";
import { getHomePageData } from "../../firebase/Orders";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Main Screen - Home Page
export const Main = () => {
	const [homePage, setHomePage] = useState([{}]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getHomePageData()
				.then(res => {
					setHomePage(res);
				})
				.catch(err => console.log(err));
		}
		return () => {
			isMounted = false;
			setHomePage([{}]);
		};
	}, []);

	return (
		<main className={Styles.Main}>
			<CreateSquare data={homePage} type="square" />
		</main>
	);
};
