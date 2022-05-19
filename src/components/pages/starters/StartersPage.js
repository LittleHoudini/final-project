import React, {useState, useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./starters.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const StartersPage = () => {
	const [starters ,setStarters] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Starters','starters')
		.then((res) =>{
			// console.log(typeof res)
			setStarters(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrapperstarters">
			<CreateSquare data={starters} type="productsquare" />
		</div>
	);
};
