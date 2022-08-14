import React from "react";
import CreateSquare from "../../createSquare/CreateSquare";

import "./burgers.css";
import { useEffect, useState } from "react";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import { getUserClassification } from "../../../firebase/Users";
import { UserContext } from "../../../App";
import { useContext } from "react";

export const BurgersPage = () => {
	const [burgers, setBurgers] = useState([{}]);
	// const [clicked, setClicked] = useState(false);
	const [userType, setUserType] = useState("");
	const currentUser = useContext(UserContext);
	const [clicks, setClicked] = useState({
		edit : false,
		deleteDish : false,
		disable : false,
	});

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getAllDishesFromCategory("Category", "Burgers", "burgers")
				.then(res => {
					setBurgers(res);
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
		<div className="wrapperburgers">
			<CreateSquare data={burgers} type="productsquare" clicks={clicks} setClicked={setClicked} userType={userType} />
		</div>
	);
};
