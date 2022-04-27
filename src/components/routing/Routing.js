/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Main from '../main/Main';
import CreateSquare from '../createSquare/CreateSquare';
import * as products from '../../data/products.js';
import styles from './mainform.module.css'
import * as adminmain from '../../data/adminmain.js'
import Navbar1 from '../navbar/Navbar1';
import MainImage from '../mainImage/MainImage';
import PageNotFound from '../pageNotFound/PageNotFound';
// import { Component } from 'react';
import Signup from '../authentication/Signup';
import Signin from '../authentication/Signin';
// import Signout from '../authentication/Signout';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Routing() {  
   return (
    <Router>
      {/* navbar and mainimage components */}
      <Navbar1/>
      <MainImage/>
      {/* All the routes */}
      <div className={styles.wrapper}> 
        <Routes>      
          <Route path="/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
          <Route path="/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
          <Route path="/extras" element={<CreateSquare data={products.extras_page_squares} type="productsquare"/>}/>
          <Route path="/burgers" element={<CreateSquare data={products.burgers_page_squares} type="productsquare"/>}/>
          <Route path="/combos" element={<CreateSquare data={products.combos_page_squares} type="productsquare"/>}/>
          <Route path="/drinks" element={<CreateSquare data={products.drinks_page_squares} type="productsquare"/>}/>
          <Route path="/coctails" element={<CreateSquare data={products.cocktails_page_squares} type="productsquare"/>}/>
          <Route path="/store" element={<CreateSquare data={products.store_page_squares} type="productsquare"/>}/>
          <Route path="/adminmain" element={<CreateSquare data={adminmain.admin_main_btn} type="adminmain"/>}/>
          <Route path="/" exact element={<Main/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div> 
    </Router>
   );
 }
 export default Routing;