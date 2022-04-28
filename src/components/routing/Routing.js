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
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Routing() { 
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
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Routes>

   );
  }
  export default Routing;