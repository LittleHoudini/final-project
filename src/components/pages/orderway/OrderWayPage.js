import React from "react";
// import "./orderway.css";
import OrderWay from "../../Order/OrderWay";

export const OrderWayPage = ({ openOrderWayPage, setOpenOrderWayPage}) => {
	return (
		<div>
			{openOrderWayPage ? <OrderWay open={openOrderWayPage} setOpen={setOpenOrderWayPage} /> : null}
		</div>
	);
};
