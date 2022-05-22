import React from "react";
import "./orderway.css";
import "../button/btn.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const OrderWay = ({ open, setOpen }) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
		<DialogTitle>כיצד תרצה לקבל את ההזמנה?</DialogTitle>
		<DialogContent>
				<div  className="sign-div-order"> 
	
				<button className="containerbtn">משלוח</button>
				<button className="containerbtn">איסוף עצמי</button>
				<button className="containerbtn">ישיבה במקום</button>
				
				  </div>
			
		
			
        </DialogContent>
			<DialogActions>
				<button className="closebtn" onClick={() => setOpen(false)}>X</button>
			</DialogActions>
		</Dialog>
	);
};

export default OrderWay;