import CreateSquare from "../../createSquare/CreateSquare";
import "./burgers.css";
import React, { useEffect, useState, useContext } from "react";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import { getUserClassification } from "../../../firebase/Users";
import { UserContext } from "../../../App";

export const BurgersPage = () => {
	const [burgers, setBurgers] = useState([{}]);
	const [userType, setUserType] = useState("");
	const currentUser = useContext(UserContext);

	const [clicks, setClicked] = useState({
		edit: false,
		deleteDish: false,
		disable: false,
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
