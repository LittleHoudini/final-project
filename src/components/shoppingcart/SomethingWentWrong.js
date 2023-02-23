import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SomethingWentWrong({ openSomethingWentWrong, setOpenSomethingWentWrong }) {
	const handleClose = () => {
		setOpenSomethingWentWrong(false);
	};

	return (
		<div>
			<Dialog
				open={openSomethingWentWrong}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"שגיאה"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
					סליחה, משהו השתבש. אנא נסה מאוחר יותר. אם הינך ממשיך לראות הודעה זו אנא צור איתנו קשר
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						סגור
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
