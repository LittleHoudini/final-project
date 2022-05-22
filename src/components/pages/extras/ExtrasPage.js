import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./extra.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";



export const ExtrasPage = () => {
	const [extras ,setExtras] = useState([
		 {
			image: "",
			price: "",
			text: "",
			title: ""
		},
	])
	useEffect(() => {
		getAllDishesFromCategory('Category','Extras','extras')
		.then((res) =>{
			// console.log(typeof res)
			setExtras(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	
	return (
		<div className="wrapperextras">
			<CreateSquare data={extras} type="productsquare" />
		</div>
	);
};
