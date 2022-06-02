import React, {useState, useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./starters.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const StartersPage = () => {
	const [starters ,setStarters] = useState([{}])
	useEffect(() => {
		getAllDishesFromCategory('Category','Starters','starters')
		.then((res) =>{
			localStorage.setItem('starters',JSON.stringify(res))
			setStarters(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const starters = JSON.parse(localStorage.getItem('starters'));
		console.log("in get " , starters);
		if(starters){
			setStarters(starters);
		}
	},[])

	return (
		
		<div className="wrapperstarters">
			<CreateSquare data={starters} type="productsquare" />
		</div>
	);
};
