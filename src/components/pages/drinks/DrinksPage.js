import React, {useState, useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./drinks.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const DrinksPage = () => {
	const [drinks ,setDrinks] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Drinks','drinks')
		.then((res) =>{
			// console.log(typeof res)
			setDrinks(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrapperdrinks">
			<CreateSquare data={drinks} type="productsquare" />
		</div>
	);
};
