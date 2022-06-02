import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./extra.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";



export const ExtrasPage = () => {
	const [extras ,setExtras] = useState([{}])
	useEffect(() => {
		getAllDishesFromCategory('Category','Extras','extras')
		.then((res) =>{
			localStorage.setItem('extras',JSON.stringify(res))
			setExtras(res);
		})
		.catch((err) => console.log(err))
	},[]);
	

	useEffect(() => {
		const extras = JSON.parse(localStorage.getItem('extras'));
		if(extras){
			setExtras(extras);
		}
	},[])

	return (
		<div className="wrapperextras">
			<CreateSquare data={extras} type="productsquare" />
		</div>
	);
};
