//Incase the user enters invalid route a 404 error page will raise.

import { useState, useEffect } from "react";
import { getMenuCategories } from "../../firebase/Orders";
import "./addproduct.css";
import uuid from "react-uuid";
import { MultiSelect } from "react-multi-select-component";
import { getItems } from "../../firebase/Orders";
import { addIngredient } from "../../firebase/Admin";
import { IngredientExists } from "../../firebase/Admin";
import { addProductWithIngredients, addProduct } from "../../firebase/Admin";
import Alert from "@mui/material/Alert";
const AddProduct = () => {
	const [categories, setCategories] = useState([{}]);
	const [error, setError] = useState("");
	const [selected, setSelected] = useState([]);
	const [success, setSuccess] = useState(false);
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
					console.log(res);
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
		selected.map(item => {
			obj[item.value] = 1;
		});
		return obj;
	};

	const checkInput = e => {
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

		if ((formData.hasIngredients && selected.length > 4) || (formData.hasIngredients && selected.length <= 0)) {
			setError("You can only select up to four ingredients");
			return false;
		}

		return true;
	};

	const handleForm = async e => {
		e.preventDefault();
		console.log(error);
		console.log(convertSelectedToMatchDB(selected));
		console.log(formData.category);
		if (checkInput(e)) {
			try {
				if (formData.hasIngredients) {
					await Promise.all(
						selected.map(async element => {
							const res = await IngredientExists(element.value);
							if (!res) {
								await addIngredient(element.value);
							}
						})
					);
					const res = await addProductWithIngredients(formData, convertSelectedToMatchDB(selected));
					setError("");
					setSuccess(true);
					return true;
				} else {
					const res = await addProduct(formData);
					setError("");
					setSuccess(true);
					return true;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="wrapper2">
			<div className="wrapperInside">
				<form onSubmit={e => handleForm(e)}>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					{success && <Alert severity="success">Product Successfully Added</Alert>}
					
					<label htmlFor="category">בחר את הקטגוריה של המוצר</label>
				
					<select className="select" id="category" value={formData.category} onChange={handleChange} name="category">
						<option key={uuid()} value={""}>
							{" "}
						</option>
						{categories.map(category => {
							return (
								<option key={uuid()} value={category.docID}>
									{category.docID}
								</option>
							);
						})}
					</select>
					<p>שם המוצר</p>
					<input
						className="inputStyle"
						type="text"
						placeholder="שם המוצר"
						onChange={handleChange}
						name="productName"
						value={formData.productName}
					/>
					<p>מחיר המוצר</p>
					<input
						className="inputStyle"
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						placeholder="מחיר המוצר"
						onChange={handleChange}
						name="price"
						value={formData.price}
					/>
					<p>תמונת המוצר</p>
					<input
						className="inputStyle"
						type="text"
						placeholder="הכנס כתובת תמונה"
						onChange={handleChange}
						name="imageLink"
						value={formData.imageLink}
					/>
					{/* <img className="productImg" src={formData.imageLink}></img> */}
					<p>תיאור המוצר</p>
					<input
						className="inputStyle"
						type="text"
						placeholder="הכנס תיאור המתאר את המנה "
						onChange={handleChange}
						name="text"
						value={formData.text}
					/>
					<p>כותרת המוצר</p>
					<input className="inputStyle" type="text" placeholder="כותרת המוצר" onChange={handleChange} name="title" value={formData.title} />
					<br />
					
					<input
						className="hasIngredients"
						type="checkbox"
						id="hasIngredients"
						checked={formData.hasIngredients}
						onChange={handleChange}
						name="hasIngredients"
					/>
					<label  dir="rlt" htmlFor="hasIngredients">האם המוצר בעל רכיבים?</label>
					<div>
						{!formData.hasIngredients ? null : (
							<>
								<p>בחר עד ארבעה רכיבים למנה</p>
								<MultiSelect
									options={convertItemsToMatchOptions() || [{}]}
									value={selected}
									onChange={setSelected}
									labelledBy="Select"
									isCreatable={true}
									className="select2"
								/>
							</>
						)}
					</div>
					<br />
					<button className="containerbtn adminPanelBtn" type="submit">
						הוספת מוצר
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
