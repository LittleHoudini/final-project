/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import { Routes, Route } from "react-router-dom";
 import PageNotFound from "../pageNotFound/PageNotFound";
 import "../authentication/sign.css";
 import { HomePage } from "../pages/home/HomePage";
 import { StorePage } from "../pages/store/StorePage";
 import { StartersPage } from "../pages/starters/StartersPage";
 import { CoctailsPage } from "../pages/coctails/CoctailsPage";
 import { DrinksPage } from "../pages/drinks/DrinksPage";
 import { CombosPage } from "../pages/combos/CombosPage";
 import { BurgersPage } from "../pages/burgers/BurgersPage";
 import { ExtrasPage } from "../pages/extras/ExtrasPage";
 import { ShoppingCart } from "../shoppingcart/ShoppingCart";
 import { UserProfile } from "../userprofile/UserProfile";
 import { MenuCategoriesPage } from "../pages/menucategories/MenuCategoriesPage";
 // import UserOrders from "../userorders/UserOrders";
 import UserOrdersPage from '../pages/userorders/UserOrdersPage';
 import Stock from '../stock/Stock.js';
 import ManageOrdersPage from "../pages/manageOrders/ManageOrdersPage";

 import { useContext } from "react";
import { UserContext } from "../../App";
import { useState,useEffect } from "react";
import { getUserClassification } from "../../firebase/Users";
import AddProduct from "../addproduct/AddProduct"
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Routing() {
	const currentUser = useContext(UserContext);
	const [userType, setUserType] = useState("");
	useEffect(() => {
		if (currentUser) {
			//checks user classification to determine if hes admin or worker
			getUserClassification(currentUser)
				.then(result => {
					setUserType(result);
				})
				.catch(err => {
					console.log("error in fetching classification : ", err);
				});
		}
		return () => {
			setUserType("");
		};
	}, [currentUser]);
	 return (
		 <div>
 
			 <Routes>
				 <Route path="/starters" element={<StartersPage />} />
				 <Route path="/extras" element={<ExtrasPage />} />
				 <Route path="/burgers" element={<BurgersPage />} />
				 <Route path="/combos" element={<CombosPage />} />
				 <Route path="/drinks" element={<DrinksPage />} />
				 <Route path="/coctails" element={<CoctailsPage />} />
				 <Route path="/store" element={<StorePage />} />
				 {/* <Route path="/adminmain" element={<CreateSquare data={adminmain.admin_main_btn} type="adminmain"/>}/> */}
				 {
					userType === "admin" ? <Route path="/" element={<Stock/>} /> : <Route path="/" exact element={<HomePage />} />
				 }
				 {/* <Route path="/" exact element={<HomePage />} /> */}
				 <Route path="*" element={<PageNotFound />} />
 
				 {/* ממשק משתמש - לקוח */}
				 <Route path="/profile" element={<UserProfile />} />
				 <Route path="/orders" element={<UserOrdersPage/>} />
 
				 {/* תבנית של סל הקניה */}
				 <Route path="/shoppingcart" element={<ShoppingCart />} />
				 {/* קטגוריות התפריט */}
				 <Route path="/menucategories" element={<MenuCategoriesPage />} />
				 <Route path="/admin/stock" element={<Stock/>} />
				 <Route path="/admin/manageorders" element={<ManageOrdersPage/>} />
				 <Route path="/admin/addproduct" element={<AddProduct/>} />
				 
 
			 </Routes>
 
		 </div>
	 );
 }
 export default Routing;
 