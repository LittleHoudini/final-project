import React, {useState,useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { combos_page_squares } from "../../../data/products";
import "./combos.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const CombosPage = () => {
	const [combos ,setCombos] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Combos','combos')
		.then((res) =>{
			// console.log(typeof res)
			setCombos(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrappercombos">
			<CreateSquare data={combos} type="productsquare" />
		</div>
	);
};
