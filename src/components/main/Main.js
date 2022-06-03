/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useState,useEffect} from "react";
import { home_page_squares } from "../../data/products";
import CreateSquare from "../createSquare/CreateSquare";
import Styles from "./main.module.css";
import { getHomePageData } from "../../firebase/Orders";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Main Screen - Home Page
export const Main = () =>  {
	const [homePage ,setHomePage] = useState([{}])

	useEffect(() => {
		getHomePageData()
		.then((res) =>{
			localStorage.setItem('homepage',JSON.stringify(res))
			setHomePage(res);
		})
		.catch((err) => console.log(err))
	},[]);

	useEffect(() => {
		const homepage = JSON.parse(localStorage.getItem('homepage'));
		if(homePage){
			setHomePage(homepage);
		}
	},[])
	
		return (
			<main className={Styles.Main}>
				<CreateSquare data={homePage} type="square" />
			</main>
		);
	
}
