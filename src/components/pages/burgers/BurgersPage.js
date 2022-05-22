import React from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { burgers_page_squares } from "../../../data/products";
import "./burgers.css";
import { useEffect, useState } from "react";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const BurgersPage = () => {
	const [burgers ,setBurgers] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Burgers','burgers')
		.then((res) =>{
			// console.log(typeof res)
			setBurgers(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrapperburgers">
			<CreateSquare data={burgers} type="productsquare"/>
		</div>
	);
};

