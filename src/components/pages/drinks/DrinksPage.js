import React, { useState, useEffect } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./drinks.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import { getUserClassification } from "../../../firebase/Users";
import { UserContext } from "../../../App";
import { useContext } from "react";

export const DrinksPage = () => {
	const [drinks, setDrinks] = useState([{}]);
	const [clicks, setClicked] = useState({
		edit : false,
		deleteDish : false,
		disable : false,
	});
	const [userType, setUserType] = useState("");
	const currentUser = useContext(UserContext);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getAllDishesFromCategory("Category", "Drinks", "drinks")
				.then(res => {
					setDrinks(res);
				})
				.catch(err => console.log(err));
		}
		return () => (isMounted = false);
	}, [clicks]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (currentUser) {
				//checks user classification to determine if hes admin or worker
				getUserClassification(currentUser)
					.then(result => {
						console.log("result = ", result);
						setUserType(result);
					})
					.catch(err => {
						console.log("error in fetching classification : ", err);
					});
			}
		}
		return () => {
			isMounted = false;
			setUserType("");
		};
	}, [currentUser]);

	return (
		<div className="wrapperdrinks">
			<CreateSquare data={drinks} type="productsquare" setClicked={setClicked} userType={userType} clicks={clicks}/>
		</div>
	);
};
