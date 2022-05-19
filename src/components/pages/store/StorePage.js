import React,{useEffect,useState} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { store_page_squares } from "../../../data/products";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import "./store.css";
export const StorePage = () => {
	const [store ,setStore] = useState([
		{
		   image: "",
		   price: "",
		   text: "",
		   title: ""
	   },
   ])
	useEffect(() => {
		getAllDishesFromCategory('Category','Store','store')
		.then((res) =>{
			// console.log(typeof res)
			setStore(res)
			// console.log(extras)
		})
		.catch((err) => console.log(err))
	},[]);
	return (
		<div className="wrapperstore">
			<CreateSquare data={store} type="productsquare" />
		</div>
	);
};
