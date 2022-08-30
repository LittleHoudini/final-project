import React, { useState, useEffect } from "react";
import CreateSquare from "../createSquare/CreateSquare";
import { getHomePageData } from "../../firebase/Orders";

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
		<main>
			<CreateSquare data={homePage} type="square" />
		</main>
	);
};
