import React from 'react';
import './orderway.css';
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const OrderWayPage = () => {

  const [buttonPopup, setButtonPopup] = useState(true);
  return (
      <div className='tada'> 
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      
      <div className='orderwaypage'>
<h1>כיצד תרצה לקבל את ההזמנה?</h1>
<button>משלוח</button>
<button>איסוף עצמי</button>
<button>ישיבה במקום</button>
  </div>
      </Popup>
    
      </div>

            
  )
}