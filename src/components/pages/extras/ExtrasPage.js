import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./extra.css";

import { getAllDishesFromCategory, getDishIngredients } from "../../../firebase/Orders";
import Ingredients from "../../ingredients/Ingredients";
import ProductSquare from "../../productSquare/ProductSquare";


export const ExtrasPage = () => {
	const [extras ,setExtras] = useState([
		 {
			image: "",
			price: "",
			text: "",
			title: ""
		},
	])
	const [ingredients, setIngredients] = useState({})
	const [ingredients1, setIngredients1] = useState({})
	// const [open, setOpen] = useState(false)

	// const [extrasItems, setExtrasItems] = useState({
	// 	onion: "",
	// 	tomato: "",
	// })

	// const extras_page_squares = [
	// 	{
	// 		title: "צ'יפס",
	// 		// image: Fries,
	// 		text: "",
	// 		price: "19.00",
	// 	},
	// 	{
	// 		title: "סלט ירוק",
	// 		// image: GreenSalad,
	// 		text: "",
	// 		price: "19.00",
	// 	},
	// 	{
	// 		title: "טבעות בצל - חסר",
	// 		// image: GreenSalad,
	// 		text: "",
	// 		price: "22.00",
	// 	},
	// ];

	// console.log("extras_page_squars " , extras_page_squares)
	// console.log("typeof extras_page_squars " , typeof extras_page_squares)

	useEffect(() => {
		getAllDishesFromCategory('Category','Extras','extras')
		.then((res) =>{
			// console.log(typeof res)
			setExtras(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		getDishIngredients('Extras','extras','chips')
		.then((res) => {
			console.log(typeof res)
			setIngredients(res);
			// console.log(ingredients)
		})
		.catch((err) => console.log(err))
	},[])

	useEffect(() => {
		getDishIngredients('Extras','extras','salad')
		.then((res) => {
			setIngredients1(res);
			// console.log(ingredients)
		})
		.catch((err) => console.log(err))
	},[])
	const [open, setOpen] = useState(false);
	return (
		<div className="wrapperextras">
			<CreateSquare data={extras} type="productsquare" ingredients={ingredients}/>
			{/* <Ingredients includes={ingredients}  open={open} setOpen={setOpen}/> */}
		</div>
	);
};
