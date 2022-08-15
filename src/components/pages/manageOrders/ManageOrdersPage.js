import { useState, useEffect, Fragment } from "react";
import { fetchAllPendingOrders } from "../../../firebase/Orders";
import { useContext } from "react";
import { UserContext } from "../../../App";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import uuid from "react-uuid";
import { ManageOrders } from "../../manageOrders/ManageOrders";
import { HandleOrderStatus } from "../../../firebase/Orders";
import { handleStockAfterOrder,checkStockAvailbility } from "../../../firebase/Orders";
import { updateStats } from "../../../firebase/Admin";
import './manageorderspage.css';
export default function ManageOrdersPage() {
	const currentUser = useContext(UserContext);
	const [pendingOrders, setPendingOrders] = useState([]);
  const [docsUpdated, setDocsUpdated] = useState(false);
  const [error, setError] = useState(false);


  const getItemQuantity = (items) => {
		let arrayOfObjects = [];
		let obj = {};
		for (let i in items) {
			for (let key in items[i]["ing"]) {
				obj[key] = items[i]["ing"][key] * items[i]["quantity"];
			}
			//here push
			arrayOfObjects.push(obj);
			obj = {};
		}

		return arrayOfObjects;
	};

  
  // {docs.date[3]+docs.date[4]}

  const handleStatusChange = async (docs,status) => {
    if(status === "Approved"){
      console.log("Approved")
      const canUpdateStock = await checkStockAvailbility(getItemQuantity(docs.orders));
      if(canUpdateStock){
        setError("");
        const res = await HandleOrderStatus(docs.orderID,docs.email,status)
        handleDocsChange();
        const handleUpdate = handleStockAfterOrder(getItemQuantity(docs.orders));
        updateStats(docs.cartTotal,docs.date[3]+docs.date[4]);
        
      }
      else{
        setError(`Can't approve order ${docs.orderID}, Stock can not be updated, Please check stock status`)
      }
    }
    else{
      const res = await HandleOrderStatus(docs.orderID,docs.email,status)
      handleDocsChange();
    }
    
  }

  const handleDocsChange = () => {
		setDocsUpdated(prev => !prev);
	};
  
	useEffect(() => {
		let isMounted = true;
        //make sure there is user logged in
		if (currentUser) {
			fetchAllPendingOrders()
				.then(res => {
          //if component did mount, set res to state
					if (isMounted) {
            const sortedOrders = res.sort(function (a, b) {
              return a.date.localeCompare(b.date);
            });

            setPendingOrders(sortedOrders);
					}
				})
				.catch(err => console.log(err));
		}
    //component did unmount
		return () => {
			isMounted = false;
      // setDocsUpdated(false);
		};
	}, [currentUser,docsUpdated]);

  if(pendingOrders.length === 0) return <p>No Pending Orders</p>

	return (
    <div className="wrapper22">
      
            <TableContainer  component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow className="ordersTitle">
                  <TableCell />
                  <TableCell style={{color:'white'}}  align="right">סה״כ </TableCell>
                    <TableCell style={{color:'white'}}  >תאריך </TableCell>
                    <TableCell style={{color:'white'}}  >סטטוס</TableCell>
                    <TableCell  style={{color:'white'}} >מספר הזמנה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="wrappershoppingcart">
                {error ? <label style={{ color: "red" }}>{error}</label> : null}
                {pendingOrders.map((docs) => {
                    // docs => each doc represents user order history
                    return (
                      <Fragment key={uuid()} >

                        <ManageOrders key={uuid()} docs={docs}  />
                        <TableRow  key={uuid()}>
                         <TableCell className="btnArea">
                            <button   onClick={() => handleStatusChange(docs,"Approved")} className="containerbtn1">
                            לאשר הזמנה
                            </button> 
                            <button  onClick={() => handleStatusChange(docs,"Canceled")} className="containerbtn1">
                              לבטל הזמנה
                            </button>
                            </TableCell>
                       </TableRow>
                      </Fragment>
                    )
                })}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
        
	);
}
