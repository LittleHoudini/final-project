import React, {useEffect,useState} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./coctails.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";

export const CoctailsPage = () => {
	const [coctails ,setCoctails] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Coctails','coctails')
		.then((res) =>{
			// console.log(typeof res)
			setCoctails(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrappercoctails">
			<CreateSquare data={coctails} type="productsquare" />
		</div>
	);
};
