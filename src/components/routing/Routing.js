/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import{ Routes,Route } from 'react-router-dom';
 import PageNotFound from '../pageNotFound/PageNotFound';
 import  '../authentication/sign.css'
 import { SignupPage } from '../pages/signup/SignupPage';
 import { SigninPage } from '../pages/signin/SigninPage';
 import { HomePage } from '../pages/home/HomePage';
 import { StorePage } from '../pages/store/StorePage';
 import { StartersPage } from '../pages/starters/StartersPage';
 import { CoctailsPage } from '../pages/coctails/CoctailsPage';
 import { DrinksPage } from '../pages/drinks/DrinksPage';
 import { CombosPage } from '../pages/combos/CombosPage';
 import { BurgersPage } from '../pages/burgers/BurgersPage';
 import { ExtrasPage } from '../pages/extras/ExtrasPage';
 import { OrderWayPage } from '../pages/orderway/OrderWayPage'
 import {ReportTypePage } from '../pages/reporttype/ReportTypePage'
 import {ProductPopUpPage } from '../pages/productpopup/ProductPopUpPage'
 import {ShoppingCartPage} from '../pages/shoppingcart/ShoppingCartPage'
 import {UserProfilePage} from '../pages/userprofile/UserProfilePage'
 import {MenuCategoriesPage} from '../pages/menucategories/MenuCategoriesPage'
 import { useContext } from "react";
import { UserContext } from '../../App';
  /*****************************************
   * * CREATE REACT FUNCTION COMPONENT
   *****************************************/
  
  function Routing() { 
    const currentUser = useContext(UserContext);
    return (
     <Routes>   
       <Route path="/starters" element={<StartersPage/>}/>
       <Route path="/extras" element={<ExtrasPage/>}/>
       <Route path="/burgers" element={<BurgersPage/>}/>
       <Route path="/combos" element={<CombosPage/>}/>
       <Route path="/drinks" element={<DrinksPage/>}/>
       <Route path="/coctails" element={<CoctailsPage/>}/>
       <Route path="/store" element={<StorePage/>}/>
       {/* <Route path="/adminmain" element={<CreateSquare data={adminmain.admin_main_btn} type="adminmain"/>}/> */}
       <Route path="/" exact element={<HomePage/>}/>
       <Route path="*" element={<PageNotFound/>}/>
         {/* פופ אפ לבחירת אופן ביצוע המשלוח */}
       <Route path="/orderway" element={<OrderWayPage/>}/>
       {/* פופ אפ לבחירתסוג הדוח */}
       <Route path="/reporttype" element={<ReportTypePage/>}/>
       {/* זה בעצם הקישור שפותח פופאפ לכל מנה להזמנה^ צריך לקשר לכפתורים בתפריט */}
       <Route path="/productpopup" element={<ProductPopUpPage/>}/> 
       {/* ממשק משתמש - לקוח */}
       <Route path="/userprofile" element={<UserProfilePage/>}/> 
       {/* תבנית של סל הקניה */}
       <Route path="/shoppingcart" element={<ShoppingCartPage/>}/> 
       {/* קטגוריות התפריט */}     
       <Route path="/menucategories" element={<MenuCategoriesPage/>}/> 
       {currentUser ?
            <>
            <Route path="/signin" element={<HomePage/>}/>
            <Route path="/signup" element={<HomePage/>}/>
            </>
            :
            <>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            </>
      }
     </Routes>
 
    );
   }
   export default Routing;