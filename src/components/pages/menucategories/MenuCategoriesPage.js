/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from "react";

import CreateSquare from "../../createSquare/CreateSquare";
import "./menucategories.css";
import { useState, useEffect } from "react";
import { getMenuCategories } from "../../../firebase/Orders";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Menu Categories Page

export const MenuCategoriesPage = () => {
	const [categories, setCategories] = useState([{}]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getMenuCategories()
				.then(res => {
					setCategories(res);
				})
				.catch(err => console.log(err));
		}
		return () => isMounted = false;
	}, []);

	return (
		<div className="main2">
			<CreateSquare data={categories} type="square" />
		</div>
	);
};
