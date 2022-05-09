import React from 'react';
import './reporttype.css';
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const ReportType = () => {

  const [buttonPopup, setButtonPopup] = useState(true);
  return (
      <div className='tada'> 
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      
      <div className='orderwaypage'>
<h1>נא לבחור את סוג הדוח</h1>
<button>x</button>
<button>y</button>
<button>z</button>
  </div>
      </Popup>
    
      </div>

            
  )
}