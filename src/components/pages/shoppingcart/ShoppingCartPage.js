import React from 'react';
import './shoppingcart.css';


export const ShoppingCartPage = () => {
  return (
    <div className='wrapper2'>
          <div className='wrappershoppingcart'>
    <section className='orderdetails'>
    
    <p className='orderdetail'>  מספר הזמנה </p> 
    <p className='orderdetail'>  שם המזמין </p> 
    <p className='orderdetail'>  כתובת </p> 
    <p className='orderdetail'>  מספר טלפון </p> 
    <p className='orderdetail'> הערות לכתובת  </p> 
    <p className='orderdetail'>הערות לשליח </p> 
    </section>
    <section className='shoppingcart'>
   
   <div className='сhangequantity'>
   <button className='сhangequantitybtn'>מחיקת מנה</button>
    <button className='сhangequantitybtn'>שכפול מנה</button>
    <button className='сhangequantitybtn'>עריכה</button>
        </div>

        <div className='productdetails'>
   <p className='productdetail'> מחיר </p> 
   <p className='productdetail'>  תוספת </p> 
   <p className='productdetail'>  שם מנה </p> 
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
