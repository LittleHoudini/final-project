import React from "react";
import CreateSquare from "../../createSquare/CreateSquare";
import { combos_page_squares } from "../../../data/products";
import "./combos.css";

export const CombosPage = () => {
	return (
		<div className="wrappercombos">
			<CreateSquare data={combos_page_squares} type="productsquare" />
		</div>
	);
};
