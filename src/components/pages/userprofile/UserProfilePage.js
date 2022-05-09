import React from 'react';
import './userprofile.css';
import HeartSmallLogo from '../../../images/kiss_logo_heart_red_small.png';


export const UserProfilePage = () => {
  return (
    <div className='wrapper2'>
          <div className='wrappershoppingcart'>
    <section className='orderdetails'>
    
   <div className='userpfp'> 
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

    <section  className='personaldetailsupdate'>
    <h1>שינוי פרטים אישיים </h1>
    <form>
            <input placeholder="First Name"  />
            <input placeholder="Last Name"  />
            <input placeholder="Phone Number" />
            <input placeholder="City" />
            <input placeholder="Street" />
            <input placeholder="Home Number"  />
            <input placeholder="Email" />
            <input placeholder="Password"  />
            <br></br>
        </form>
        <button className='savebtn' type="submit">שמירת פרטים</button>
    </section>
    <section className='orderslistcuntainer'>
   

   <div className='orderslist'>

    <button className='duporder'>הזמנה חוזרת</button>
   <p className='orderdetail'>מספר הזמנה</p> 
   <p className='orderdetail'>  תאריך </p> 
   <p className='orderdetail'>  סכום הזמנה </p> 
        </div>
</section>


<section className='savebtncontainer'>
    <button className='savebtn'>שמירה</button>
   
 
</section>
    </div>
    </div>
  )
}
