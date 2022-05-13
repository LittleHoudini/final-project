import React from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { burgers_page_squares } from "../../../data/products";
import "./burgers.css";

export const BurgersPage = () => {
	return (
		<div className="wrapperburgers">
			<CreateSquare data={burgers_page_squares} type="productsquare" />
		</div>
	);
};
