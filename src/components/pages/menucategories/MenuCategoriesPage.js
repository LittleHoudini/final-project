/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from "react";

import CreateSquare from "../../createSquare/CreateSquare";
import "./menucategories.css";
import { useState,useEffect } from "react";
import { getMenuCategories } from "../../../firebase/Orders";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Menu Categories Page

export const MenuCategoriesPage = () => {

	const [categories ,setCategories] = useState([{}])

	useEffect(() => {
		getMenuCategories()
		.then((res) => {
			localStorage.setItem('categories',JSON.stringify(res))
			setCategories(res);
		})
		.catch((err) => console.log(err))
	},[]);
	

	useEffect(() => {
		const categories = JSON.parse(localStorage.getItem('categories'));
		if(categories){
			setCategories(categories);
		}
	},[])

	return (
		<div className="main2">
			<CreateSquare data={categories} type="square" />
		</div>
	);
};
