import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import "./coctails.css";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import { getUserClassification } from "../../../firebase/Users";
import { UserContext } from "../../../App";
import { useContext } from "react";

export const CoctailsPage = () => {
	const [cocktails, setCocktails] = useState([{}]);
	const [clicked, setClicked] = useState(false);
	const [userType, setUserType] = useState("");
	const currentUser = useContext(UserContext);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getAllDishesFromCategory("Category", "Coctails", "coctails")
				.then(res => {
					setCocktails(res);
				})
				.catch(err => console.log(err));
		}
		return () => (isMounted = false);
	}, [clicked]);

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
		<div className="wrappercoctails">
			<CreateSquare data={cocktails} type="productsquare" userType={userType} setClicked={setClicked} />
		</div>
	);
};
