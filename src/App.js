/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React, { useState, useEffect, createContext } from "react";
import Routing from "./components/routing/Routing";
import Footer from "./components/footer/Footer";
import getFirebase from "./firebase/Firebase";
import Navbar1 from "./components/navbar/Navbar1";
import { MainImage } from "./components/mainImage/MainImage";
import { CartProvider } from "react-use-cart";
import { PayPalScriptProvider  } from "@paypal/react-paypal-js";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/
//context to pass state
export const UserContext = createContext();

function App() {
	// Create a currentUser state
	const [currentUser, setCurrentUser] = useState(null);
	// Listen to onAuthStateChanged
	useEffect(() => {
		const firebase = getFirebase();
		if (firebase) {
			console.log("db connected");
			firebase.auth().onAuthStateChanged(authUser => {
				if (authUser) {
					setCurrentUser(authUser.email);
				} else {
					setCurrentUser(null);
				}
			});
		}
	}, []);
	return (
		<UserContext.Provider value={currentUser}>
			<PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,currency:"ILS" }}>
				<div className="app">
					<CartProvider>
						{/* <h1>{currentUser ? `The current logged in user is: ${currentUser}` : "No user is currently logged in."}</h1> */}
						<Navbar1 />
						<MainImage />
						<Routing currentUser={currentUser} />
						<Footer />
					</CartProvider>
				</div>
			</PayPalScriptProvider>
		</UserContext.Provider>
	);
}

export default App;
