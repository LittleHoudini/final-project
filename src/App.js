/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
<<<<<<< HEAD
 import React, { useState, useEffect, createContext } from "react";
 import Routing from "./components/routing/Routing";
 import Footer from "./components/footer/Footer";
 import getFirebase from "./firebase/Firebase";
 import Navbar1 from "./components/navbar/Navbar1";
 import {MainImage} from "./components/mainImage/MainImage";
 import { CartProvider } from "react-use-cart";

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
			 firebase.auth().onAuthStateChanged((authUser) => {
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
			 <div className="app">
				 <CartProvider>
					 <h1>{currentUser ? `The current logged in user is: ${currentUser}` : "No user is currently logged in."}</h1>
					 <Navbar1 />
					 <MainImage />
					 <Routing currentUser={currentUser} />
					 <Footer />
				 </CartProvider>
			 </div>
		 </UserContext.Provider>
	 );
 }
 
 export default App;
 
=======
import React, { useState, useEffect, createContext } from "react";
import Routing from "./components/routing/Routing";
import Footer from "./components/footer/Footer";
import getFirebase from "./firebase/Firebase";
import Navbar1 from "./components/navbar/Navbar1";
import {MainImage} from "./components/mainImage/MainImage";
import { CartProvider } from "react-use-cart";
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
			firebase.auth().onAuthStateChanged((authUser) => {
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
			<div className="app">
				<CartProvider>
					<h1>{currentUser ? `The current logged in user is: ${currentUser}` : "No user is currently logged in."}</h1>
					<Navbar1 />
					<MainImage />
					<Routing currentUser={currentUser} />
					<Footer />
				</CartProvider>
			</div>
		</UserContext.Provider>
	);
}

export default App;
>>>>>>> a21fa53bf57510a2f82749c7abc452b0277f514f
