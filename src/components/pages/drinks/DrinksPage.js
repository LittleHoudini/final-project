import React, {useState, useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./drinks.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const DrinksPage = () => {
	const [drinks ,setDrinks] = useState([{}])

	useEffect(() => {
		getAllDishesFromCategory('Category','Drinks','drinks')
		.then((res) =>{
			localStorage.setItem('drinks',JSON.stringify(res))
			setDrinks(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const drinks = JSON.parse(localStorage.getItem('drinks'));
		if(drinks){
			setDrinks(drinks);
		}
	},[])

	return (
		<div className="wrapperdrinks">
			<CreateSquare data={drinks} type="productsquare" />
		</div>
	);
};
