import React, {useEffect,useState} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./coctails.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const CoctailsPage = () => {
	const [cocktails ,setCocktails] = useState([{}])
	useEffect(() => {
		getAllDishesFromCategory('Category','Coctails','coctails')
		.then((res) =>{
			localStorage.setItem('cocktails',JSON.stringify(res))
			setCocktails(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const cocktails = JSON.parse(localStorage.getItem('cocktails'));
		if(cocktails){
			setCocktails(cocktails);
		}
	},[])
	return (
		<div className="wrappercoctails">
			<CreateSquare data={cocktails} type="productsquare" />
		</div>
	);
};
