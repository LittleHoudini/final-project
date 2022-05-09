import React from 'react';
import './customer.css';
import HeartSmallLogo from '../../../images/kiss_logo_heart_red_small.png';


export const Customer = () => {
  return (
    <div className='wrapper2'>
          <div className='wrappershoppingcart'>
    <section className='orderdetails'>
    
   <div className='orderdetail'> 
   <p className='orderdetail'> ברוכ\ה הבאה ליאור </p> 
    <p className='orderdetail'> לעריכת פרטים אישיים </p> 
    </div>

<div className='customerpfp'>
    <img
            alt=""
            src={HeartSmallLogo}
            width="10" 
            height="10" 
            className="d-inline-block align-top align-right logo-image-nav"/>

</div>

    </section>
    <section className='shoppingcart'>
   

   <div className='сhangequantity'>

    <button className='сhangequantitybtn'>הזמנה חוזרת</button>
        </div>

        <div className='productdetails'>
   <p className='productdetail'>מספר הזמנה</p> 
   <p className='productdetail'>  תאריך </p> 
   <p className='productdetail'>  סכום הזמנה </p> 
        </div>
</section>


<section className='costbuttons'>

    <button className='orderbtn'>סיום ותשלום</button>
    <button className='orderbtn'>לרוקן את המגש</button>
    <p className='ordercost'>סהכ מחיר</p>
    <p className='ordercost'> כולל מעמ </p>
</section>
    </div>
    </div>
  )
}
