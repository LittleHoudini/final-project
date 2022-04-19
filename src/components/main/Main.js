/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import Square from '../square/Square';

import './main.css';
import {home_page_squares} from './data';
import HeartLogo from '../../images/kiss_logo_red.png';
import Beach from '../../images/beach_with_people.png';
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


// pascal case
function Main() {
  return (
    <main className="main">
      <div className='parent'>
        <img className='beach-img' src={Beach} alt="Beach with people"/>
        <img className='heart-img' src={HeartLogo} alt="Kissvibe logo"/>
      </div>
      {
      home_page_squares.map((item,index) => (
        <div key={index}>
          <Square data={item} />
        </div>
      ))
      }      
    </main>
  );
}

export default Main;
