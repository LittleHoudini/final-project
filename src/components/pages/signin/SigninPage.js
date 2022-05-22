import React from "react";
import Signin from "../../authentication/Signin";
import "./signin.css";

//passing state to parent (navbar)
export const SigninPage = ({ openSignIn, setOpenSignIn }) => {
	return (
		<div>
			{openSignIn ? <Signin open={openSignIn} setOpen={setOpenSignIn} /> : null}
		</div>
	);
};
