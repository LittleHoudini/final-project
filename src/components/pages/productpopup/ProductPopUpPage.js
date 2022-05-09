import React from 'react';
import './productpopup.css';
import Popup from '../../popups/Popups'
import {useState} from 'react';
import CreateSquare from '../../createSquare/CreateSquare'
import { burgers_page_squares } from '../../../data/products'


export const ProductPopUp = () => {

  const [buttonPopup, setButtonPopup] = useState(true);
  return (
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
    <div className='orderwaypage'>
     
   <h1>שם המוצר</h1>
   <img src={""}/>
   <p>"רוטב קיסר פרגית קריספית חסה ובצל מוחמץ",</p>
   
   

      </div>
      
      </Popup>
  )
}


