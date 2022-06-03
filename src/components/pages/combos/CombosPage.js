import React, {useState,useEffect} from "react";
import CreateSquare from "../../createSquare/CreateSquare";

import "./combos.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const CombosPage = () => {
	const [combos ,setCombos] = useState([{}])
	useEffect(() => {
		getAllDishesFromCategory('Category','Combos','combos')
		.then((res) =>{
			localStorage.setItem('combos',JSON.stringify(res))
			setCombos(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const combos = JSON.parse(localStorage.getItem('combos'));
		if(combos){
			setCombos(combos);
		}
	},[])


	return (
		<div className="wrappercombos">
			<CreateSquare data={combos} type="productsquare" />
		</div>
	);
};
