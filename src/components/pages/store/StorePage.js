import React,{useEffect,useState} from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import "./store.css";
export const StorePage = () => {
	const [store ,setStore] = useState([{}])
	useEffect(() => {
		getAllDishesFromCategory('Category','Store','store')
		.then((res) =>{
			localStorage.setItem('store',JSON.stringify(res))
			setStore(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const store = JSON.parse(localStorage.getItem('store'));
		if(store){
			setStore(store);
		}
	},[])
	return (
		<div className="wrapperstore">
			<CreateSquare data={store} type="productsquare" />
		</div>
	);
};
