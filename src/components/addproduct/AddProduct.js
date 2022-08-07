//Incase the user enters invalid route a 404 error page will raise.

import { useState, useEffect } from "react";
import { getMenuCategories } from "../../firebase/Orders";
import "./addproduct.css";
import uuid from "react-uuid";
import { MultiSelect } from "react-multi-select-component";
import { getItems } from "../../firebase/Orders";
import { addIngredient } from "../../firebase/Admin";
import { IngredientExists } from "../../firebase/Admin";
import { addProductWithIngredients ,addProduct} from "../../firebase/Admin";
const AddProduct = () => {
	const [categories, setCategories] = useState([{}]);
	const [error, setError] = useState("");
	const [selected, setSelected] = useState([]);
	const [items, setItems] = useState([
		{
			count: "",
			id: "",
			name: "",
		},
	]);

	const [formData, setFormData] = useState({
		category: "",
		productName: "",
		price: "",
		imageLink: "",
		hasIngredients: false,
		text: "",
		title: "",
	});

	//handle choice change
	function handleChange(event) {
		console.log(event);
		const { name, value, type, checked } = event.target;
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	}

	//get menu categories
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getMenuCategories()
				.then(res => {
					setCategories(res);
				})
				.catch(err => console.log(err));
		}
		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getItems("Item")
				.then(res => {
					console.log(res);
					setItems(res);
				})
				.catch(err => console.log(err));
		}
		return () => {
			isMounted = false;
			setItems([{}]);
		};
	}, []);

	// convert items to an object with value and label
	const convertItemsToMatchOptions = () => {
		let options = [];
		items.map(item => {
			options.push({
				label: item.name,
				value: item.name,
			});
		});
		return options;
	};


    const convertSelectedToMatchDB = () => {
        let obj = {};
        selected.map((item) => {
            obj[item.value] = 1;
        })
        return obj;
    }

	const checkInput = (e) => {
		e.preventDefault();
        if (formData.category.length < 1) {
			setError("Product Category Required");
			return false;
		}
        

        let nameReg = /^[a-zA-Z]+$/;
		if (formData.productName.length < 1 || !nameReg.test(formData.productName)) {
			setError("Product Name Required, Only In English");
			return false;
		}

		if (Number(formData.price) < 1) {
			setError("Price can not be below 1");
			return false;
		}

		let re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		if (!re.test(formData.imageLink)) {
			setError("Incorrect Image Link Format");
			return false;
		}

        if (formData.title < 1) {
			setError("Product title Required");
			return false;
		}

        if(formData.hasIngredients && selected.length > 4 || selected.length <= 0 ){
            setError("You can only select up to four ingredients");
			return false;
        }

		return true;
	};

	const handleForm = async (e) => {
		e.preventDefault();
        console.log(error)
        console.log(convertSelectedToMatchDB(selected));
        console.log(formData.category)
        if(checkInput(e)){
            try{
                if(formData.hasIngredients){
                    await Promise.all(
                        selected.map(async (element) => {
                            const res = await IngredientExists(element.value);
                            if(!res){
                                await addIngredient(element.value);
                            }
                        })
                    )
                    const res = await addProductWithIngredients(formData,convertSelectedToMatchDB(selected))
                    return true;

                }else{
                    const res = await addProduct(formData);
                    return true;
                }
            }
            catch(err){
                console.log(err)
            }

        }
	};

	return (
		<form onSubmit={e => handleForm(e)}>
            {error ? <label style={{ color: "red" }}>{error}</label> : null}
            <br/>
			<label htmlFor="category">Category</label>
			<br />
			<select id="category" value={formData.category} onChange={handleChange} name="category">
				{categories.map(category => {
					return (
						<option key={uuid()} value={category.docID}>
							{category.docID}
						</option>
					);
				})}
			</select>
			<input  type="text" placeholder="Product Name" onChange={handleChange} name="productName" value={formData.productName} />
			<input
				
				onKeyPress={event => {
					if (!/[0-9]/.test(event.key)) {
						event.preventDefault();
					}
				}}
				placeholder="Product Price"
				onChange={handleChange}
				name="price"
				value={formData.price}
			/>
			<input  type="text" placeholder="Product Image Link" onChange={handleChange} name="imageLink" value={formData.imageLink} />
			<input type="text" placeholder="Product Text" onChange={handleChange} name="text" value={formData.text} />
			<input  type="text" placeholder="Product Title" onChange={handleChange} name="title" value={formData.title} />
			<br />
			<input type="checkbox" id="hasIngredients" checked={formData.hasIngredients} onChange={handleChange} name="hasIngredients" />
			<label htmlFor="hasIngredients">This product has ingredients in it?</label>
			<div>
				{!formData.hasIngredients ? null : (
					<>
						<h1>Select Up To Four Ingredients</h1>
						<pre>{JSON.stringify(selected)}</pre>
						<MultiSelect
							options={convertItemsToMatchOptions() || [{}]}
							value={selected}
							onChange={setSelected}
							labelledBy="Select"
							isCreatable={true}
						/>
					</>
				)}
			</div>
			<br />
			<button type="submit">Add Product</button>
		</form>
	);
};

export default AddProduct;
