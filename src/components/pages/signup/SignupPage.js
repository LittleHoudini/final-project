import React from "react";
import Signup from "../../authentication/Signup";

//passing state to parent (navbar)
export const SignupPage = ({ openSignUp, setOpenSignUp }) => {
	return <div>{openSignUp ? <Signup open={openSignUp} setOpen={setOpenSignUp} /> : null}</div>;
};
