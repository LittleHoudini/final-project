//Incase the user enters invalid route a 404 error page will raise.

import { useState, useEffect } from "react";
import { getMenuCategories } from "../../firebase/Orders";
import './addproduct.css'
const AddProduct = () => {
	const [categories, setCategories] = useState([{}]);
    const [formData, setFormData] = useState(
        {
            firstName: "", 
            lastName: "", 
            imageLink: "", 
            comments: "", 
            ingredients: false,
            employment: "",
            category: ""
        }
    )
    
    
    function handleChange(event) {
        console.log(event)
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
	useEffect(() => {
		getMenuCategories()
			.then(res => {
				setCategories(res);
			})
			.catch(err => console.log(err));
	}, []);

	return (
         <form>
         <input
             type="text"
             placeholder="First Name"
             onChange={handleChange}
             name="firstName"
             value={formData.firstName}
         />
         <input
             type="text"
             placeholder="Last Name"
             onChange={handleChange}
             name="lastName"
             value={formData.lastName}
         />
         <input
             type="imageLink"
             placeholder="imageLink"
             onChange={handleChange}
             name="imageLink"
             value={formData.imageLink}
         />
         <textarea 
             value={formData.comments}
             placeholder="Comments"
             onChange={handleChange}
             name="comments"
         />
         <input 
             type="checkbox" 
             id="ingredients" 
             checked={formData.ingredients}
             onChange={handleChange}
             name="ingredients"
         />
         <label htmlFor="ingredients">This product has ingredients in it??</label>
         <br />
         <br />
         
         <fieldset>
             <legend>Ingredients</legend>
             <input 
                 type="radio"
                 id="unemployed"
                 name="employment"
                 value="unemployed"
                 checked={formData.employment === "unemployed"}
                 onChange={handleChange}
             />
             <label htmlFor="unemployed">Unemployed</label>
             <br />
             
             <input 
                 type="radio"
                 id="part-time"
                 name="employment"
                 value="part-time"
                 checked={formData.employment === "part-time"}
                 onChange={handleChange}
             />
             <label htmlFor="part-time">Part-time</label>
             <br />
             
             <input 
                 type="radio"
                 id="full-time"
                 name="employment"
                 value="full-time"
                 checked={formData.employment === "full-time"}
                 onChange={handleChange}
             />
             <label htmlFor="full-time">Full-time</label>
             <br />
         </fieldset>
         <br />
         
         <label htmlFor="category">Category?</label>
         <br />
         <select 
             id="category"
             value={formData.category}
             onChange={handleChange}
             name="category"
         >
             {categories.map((category) => {
                return <option value={category.title}>{category.title}</option>
             })}

         </select>
     </form>
	);
};

export default AddProduct;
