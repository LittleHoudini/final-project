/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import {store_page_squares} from '../main/data'
 import Square from '../square/Square'
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 // pascal case
 function Store() {
   return (
    store_page_squares.map((item,index) => (
        <div key={index}>
          <Square data={item} />
        </div>
      ))
   );
 }
 
 export default Store;
 