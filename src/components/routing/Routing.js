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
import Footer from '../footer/Footer';
import MainImage from '../mainImage/MainImage';
 // import {home_page_squares} from './data';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Routing() {
   return (
    <Router>
      <Navbar1 />
      <MainImage/>
      <div className={styles.wrapper}> 
        <Routes>      
          <Route path="/home/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
          <Route path="/home/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
          <Route path="/home/extras" element={<CreateSquare data={products.extras_page_squares} type="productsquare"/>}/>
          <Route path="/home/burgers" element={<CreateSquare data={products.burgers_page_squares} type="productsquare"/>}/>
          <Route path="/home/combos" element={<CreateSquare data={products.combos_page_squares} type="productsquare"/>}/>
          <Route path="/home/drinks" element={<CreateSquare data={products.drinks_page_squares} type="productsquare"/>}/>
          <Route path="/home/coctails" element={<CreateSquare data={products.cocktails_page_squares} type="productsquare"/>}/>
          <Route path="/" exact element={<Main/>}/>
          <Route path="/store" element={<CreateSquare data={products.store_page_squares} type="productsquare"/>}/>
          <Route path="/home/adminmain" element={<CreateSquare data={adminmain.admin_main_btn} type="adminmain"/>}/>
        </Routes>
      </div> 
      <Footer />
    </Router>
   );
 }
 
 export default Routing; 