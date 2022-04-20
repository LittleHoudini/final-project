/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {starters_page_squares} from '../main/data';
import ProductSquare from '../productSquare/ProductSquare';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 // pascal case
 function Store() {
   return (
    starters_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>
      ))
   );
 }
 
 export default Store;
 