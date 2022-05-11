import React ,{useEffect, useState} from 'react';
import './userprofile.css';
import HeartSmallLogo from '../../../images/kiss_logo_heart_red_small.png';
import { useContext } from "react";
import { UserContext } from '../../../App';
import { getDocument } from '../../../firebase/Users';
import { FiEye } from 'react-icons/fi';

export const UserProfilePage = () => {
  const currentUser = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(false);
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [password, setPassword]=  useState("")
  // const [phoneNumber, setPhoneNumber]=  useState("")
  // const [city, setCity]=  useState("")
  // const [street, setStreet]=  useState("")
  // const [homeNumber, setHomeNumber]=  useState("")

  const [values,setValues] = useState({
    firstName : "",
    lastName : "",
    phoneNumber : "",
    city : "",
    street: "",
    homeNumber : "",
    email : "",
    password : "",
  });
  const {firstName,lastName,phoneNumber,city,street,homeNumber,email,password} = values;

    const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

      useEffect(() => {
      let isMounted = true;
      if(currentUser){
        getDocument("Person",currentUser).then((result) => {
          setTimeout(() => {
            if(isMounted){
              console.log(result)
              setValues(result);  
            }
          }, 1000);
          
        }).catch((err) => {
          console.log(err)
        });
      }    
      return () =>{
        isMounted = false;
      };
    }, [currentUser]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

    // useEffect(() => {
    //   const fname = window.localStorage.getItem('firstName')
    //   setFirstName(JSON.parse(fname));
    //   const lname = window.localStorage.getItem('lastName');
    //   setLastName(JSON.parse(lname));
    //   const phone = window.localStorage.getItem('phoneNumber');
    //   setPhoneNumber(JSON.parse(phone));
    //   const city1 = window.localStorage.getItem('city');
    //   setCity(JSON.parse(city1));
    //   const street1 = window.localStorage.getItem('street');
    //   setStreet(JSON.parse(street1));
    //   const hNumber = window.localStorage.getItem('homeNumber');
    //   setHomeNumber(JSON.parse(hNumber));
    //   const email1 = window.localStorage.getItem('email');
    //   setEmail(JSON.parse(email1))
    //   const pw = window.localStorage.getItem('password');
    //   setPassword(JSON.parse(pw));
    // },[]);

    // useEffect(() => {
    //   let isMounted = true;
    //   if(currentUser){
    //     getDocument("Person",currentUser).then((result) => {
    //       setTimeout(() => {
    //         if(isMounted){
    //           setFirstName(result['firstName']);
    //           setLastName(result['lastName']);
    //           setPhoneNumber(result['phoneNumber']);
    //           setCity(result['city']);
    //           setStreet(result['street']);
    //           setHomeNumber(result['homeNumber']);
    //           setEmail(result['email']);
    //           setPassword(result['password']);
    //           window.localStorage.setItem('firstName',JSON.stringify(firstName));
    //           window.localStorage.setItem('lastName',JSON.stringify(lastName));
    //           window.localStorage.setItem('phoneNumber',JSON.stringify(phoneNumber));
    //           window.localStorage.setItem('city',JSON.stringify(city));
    //           window.localStorage.setItem('street',JSON.stringify(street));
    //           window.localStorage.setItem('homeNumber',JSON.stringify(homeNumber));
    //           window.localStorage.setItem('email',JSON.stringify(email));
    //           window.localStorage.setItem('password',JSON.stringify(password));
    //         }
    //       }, 1000);
    //     }).catch((err) => {
    //       console.log(err)
    //     });
    //   }
    //   return () =>{
    //     isMounted = false;
    //   };
    // }, [currentUser]);


  
  return (
    <div className='wrapper2'>
          <div className='wrappershoppingcart'>
    <section className='orderdetails'>
    
   <div className='userpfp'> 
   <br></br>
   <p className='orderdetail'> ברוכ\ה הבא  </p> 
   <br></br>
   
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
{/* 
            <input placeholder="First Name" value={firstName} onChange={event => {setFirstName(event.target.value)}} />
            <input placeholder="Last Name" value={lastName} onChange={event => {setLastName(event.target.value)}} />
            <input placeholder="Phone Number" value={phoneNumber} onChange={event => {setPhoneNumber(event.target.value)}} />
            <input placeholder="City" value={city} onChange={event => {setCity(event.target.value)}} />
            <input placeholder="Street" value={street} onChange={event => {setStreet(event.target.value)}} />
            <input placeholder="Home Number" value={homeNumber} onChange={event => {setHomeNumber(event.target.value)}} />
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type={passwordShown ? "text" : "password"} value={password} onChange={event => {setPassword(event.target.value)}} /> */}



            <input placeholder="First Name" value={firstName} onChange={handleChange('firstName')} />
            <input placeholder="Last Name" value={lastName} onChange={handleChange('lastName')} />
            <input placeholder="Phone Number" value={phoneNumber} onChange={handleChange('phoneNumber')} />
            <input placeholder="City" value={city} onChange={handleChange('city')} />
            <input placeholder="Street" value={street} onChange={handleChange('street')} />
            <input placeholder="Home Number" value={homeNumber} onChange={handleChange('homeNumber')} />
            <input placeholder="Email" value={email} onChange={handleChange('email')} />
            <input placeholder="Password" type={passwordShown ? "text" : "password"} value={password} onChange={handleChange('password')} />
            <FiEye onClick={togglePasswordVisiblity}/>

            <br></br>
        </form>
        <button className='savebtn' type="submit">שמירת פרטים</button>
    </section>
    <section className='orderslistcuntainer'>
   

   <div className='orderslist'>

   
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
