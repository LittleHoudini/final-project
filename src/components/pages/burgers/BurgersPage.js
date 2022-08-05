import React from "react";
import CreateSquare from "../../createSquare/CreateSquare";

import "./burgers.css";
import { useEffect, useState } from "react";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const BurgersPage = () => {
	const [burgers ,setBurgers] = useState([{}])
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		getAllDishesFromCategory('Category','Burgers','burgers')
		.then((res) =>{
			localStorage.setItem('burgers',JSON.stringify(res))
			setBurgers(res)
		})
		.catch((err) => console.log(err))
	},[clicked]);


	useEffect(() => {
		const burgers = JSON.parse(localStorage.getItem('burgers'));
		if(burgers){
			setBurgers(burgers);
		}
	},[setBurgers])



	return (
		<div className="wrapperburgers">
			<CreateSquare data={burgers} type="productsquare" setClicked={setClicked} />
		</div>
	);
};

