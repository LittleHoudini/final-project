import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./extra.css";
import { getAllDocuments, getSubDocument } from "../../../firebase/Users";

export const ExtrasPage = () => {
	const [extras ,setExtras] = useState([
		 {
			image: "",
			price: "",
			text: "",
			title: ""
		},
	])
	// const [extrasItems, setExtrasItems] = useState([
	// 	{
	// 		onion: "",
	// 		tomato: "",
	// 	}
	// ])
	const [extrasItems, setExtrasItems] = useState({
		onion: "",
		tomato: "",
	})
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
		getAllDocuments('Category','Extras','extras')
		.then((res) =>{
			// console.log(typeof res)
			// console.log(res)
			setExtras(res)
			console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);

	//use effect to fetch what the item includes ( ingredients)
	useEffect(() => {
		getSubDocument('Category','Extras','extras','chips','includes','ingredients')
		.then((res) =>{
			console.log(res);
			setExtrasItems(res)
			console.log(extrasItems)
		})
		.catch((err) => console.log(err))
	},[]);

	return (
		<div className="wrapperextras">
			<CreateSquare data={extras} type="productsquare" />
			<ul>
				{
					Object.entries(extrasItems).map(([key, value]) => {
						return <li key={key}>{key}: {value}</li>
					})
				}
			</ul>
		</div>
	);
};
