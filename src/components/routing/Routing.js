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
import { ReportType } from "../pages/reporttype/ReportType";
import { ShoppingCart } from "../shoppingcart/ShoppingCart";
import { UserProfile } from "../userprofile/UserProfile";
import { MenuCategoriesPage } from "../pages/menucategories/MenuCategoriesPage";
// import UserOrders from "../userorders/UserOrders";
import UserOrdersPage from '../pages/userorders/UserOrdersPage';
import Stock from '../stock/Stock.js';
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

function Routing() {
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
				<Route path="/" exact element={<HomePage />} />
				<Route path="*" element={<PageNotFound />} />
	
				{/* פופ אפ לבחירתסוג הדוח */}
				<Route path="/reporttype" element={<ReportType />} />

				{/* ממשק משתמש - לקוח */}
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/orders" element={<UserOrdersPage/>} />

				{/* תבנית של סל הקניה */}
				<Route path="/shoppingcart" element={<ShoppingCart />} />
				{/* קטגוריות התפריט */}
				<Route path="/menucategories" element={<MenuCategoriesPage />} />
				<Route path="/admin/stock" element={<Stock/>} />

			</Routes>

		</div>
	);
}
export default Routing;
