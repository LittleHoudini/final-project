/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {starters_page_squares} from '../main/data';
import ProductSquare from '../productSquare/ProductSquare';
import styles from './store.module.css'
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
  
 // pascal case
 function Store() {
   return (
     <div className={styles.wrapper}>
       {
        starters_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />          
        </div>
        ))
       }
     </div>

   );
 }
 
 export default Store;
 