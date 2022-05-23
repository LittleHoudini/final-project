import getFirebase from "./Firebase";
import { doc, setDoc, getDoc, addDoc, getFirestore, collection,query, where, getDocs } from "firebase/firestore";

//Firebase instance
const firebaseInstance = getFirebase();

export const getItems = async(frCollection) => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			let res = [];
			const querySnapshot = await getDocs(collection(db, frCollection));
			querySnapshot.forEach((doc) => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			//return array of objects(docs)
			return res; 
		}
	}catch(err){
		console.log(err)
	}
}

//Fetch all documents from a collection and return the doc
export const getSubDocument = async (frCollection,frDoc,subCollection,subDoc,subCollection1,includes) => {
	try{
		if(firebaseInstance){
			//connect to firestore
			const db = getFirestore();
			//path to get the document => example => ('Category','Extras','extras','chips','items','includes')
			//will get the document includes for specific dish,
			const docRef = doc(db, frCollection,frDoc,subCollection,subDoc,subCollection1,includes);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document");
			}
		}
		
	}catch(err){
		console.log(err)
	}
}
// category, product,dishName
export const getDishIngredients =  async (category,product,dishName) => {
    try{
        if(firebaseInstance){
            const db = getFirestore();
			// const docRef = doc(db, "Category/Burgers/burgers/CheeseBurger");
			//gets snapshot of the doc
			// const docSnap = await getDoc(docRef);
			const docSnap = await getDoc(doc(db, `Category/${category}/${product}/${dishName}`));
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data().ingredients;
			} else {
				console.log("No such document!");
				return false;
			}
        }
    }catch(err){
		console.log(err)
	}
}


//Fetch all documents from a collection and return an array of objects
export const getAllDishesFromCategory = async (frCollection,frDoc,subCollection) => {
	try{
		if(firebaseInstance){
			//connect to firestore
			const db = getFirestore();
			//declare array
			let res = [];
			//path to get the collections => example => Category/Extras/extras
			//will get all the document in extras
			const querySnapshot = await getDocs(collection(db, frCollection,frDoc,subCollection));
			//iterate over each doc and push it to array
			querySnapshot.forEach((doc) => {
			//   console.log(doc.id, " => ", doc.data());
			  let docToAdd = doc.data();
			  res.push(docToAdd);
			});
			//return array of objects
			return res;
		}
		
	}catch(err){
		console.log(err)
	}
}

export const getDishData = async (category,product,dishName) => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			const docSnap = await getDoc(doc(db, `Category/${category}/${product}/${dishName}`));
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data()
			} else {
				console.log("No such document!");
				return false;
			}
		}
	}catch(err){
		console.log(err);
	}
}