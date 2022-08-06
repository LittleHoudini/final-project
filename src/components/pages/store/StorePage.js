import React, { useEffect, useState } from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { getAllDishesFromCategory } from "../../../firebase/Orders";
import "./store.css";
import { getUserClassification } from "../../../firebase/Users";
import { UserContext } from "../../../App";
import { useContext } from "react";

export const StorePage = () => {
	const [store, setStore] = useState([{}]);
	const [clicked, setClicked] = useState(false);
	const [userType, setUserType] = useState("");
	const currentUser = useContext(UserContext);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getAllDishesFromCategory("Category", "Store", "store")
				.then(res => {
					setStore(res);
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
		<div className="wrapperstore">
			<CreateSquare data={store} type="productsquare" setClicked={setClicked} userType={userType} />
		</div>
	);
};
