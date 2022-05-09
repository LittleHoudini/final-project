/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
 import React from 'react';
 import {menu_categories} from '../../../data/products';
 import CreateSquare from '../../createSquare/CreateSquare';
 import './menucategories.css';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 //Menu Categories Page

  export const MenuCategoriesPage = () => {
    return (
      <div className='main2'>
          <CreateSquare data={menu_categories} type="square"/>
      </div>
    )
  }



