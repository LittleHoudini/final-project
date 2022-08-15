import { useState, useEffect } from "react";
import { fetchUserOrders } from "../../../firebase/Orders";
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
import UserOrders from "../../userorders/UserOrders";


export default function UserOrdersPage() {
	const currentUser = useContext(UserContext);
	const [orderHistory, setOrderHistory] = useState([]);
  const [search,setSearch] = useState("");

	useEffect(() => {
		let isMounted = true;
        //make sure there is user logged in
		if (currentUser) {
			fetchUserOrders(currentUser)
				.then(res => {
                    //if component did mount, set res to state
					if (isMounted) {
						setOrderHistory(res);
					}
				})
				.catch(err => console.log(err));
		}
        //component did unmount
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

  if(orderHistory.length === 0) return <p>You dont have Orders yet</p>

	return (
      
    <div className="myOrdersPage">
       <div className="titleDiv">
				<h1 > ההזמנות שלי</h1>
<p>לחיפוש הזמנה נא הכנס את מספר ההזמנה בשורה החיפוש</p>
				<input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} value={search}/>
        </div>
            <TableContainer component={Paper}>
              
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                  <TableCell />
                  <TableCell >ORDER ID</TableCell>
                    <TableCell >DATE ORDERED</TableCell>
                    <TableCell >STATUS</TableCell>

                    <TableCell align="right">Price For Order</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {search === "" ? orderHistory.map((docs) => {
                    // docs => each doc represents user order history
                    return <UserOrders key={uuid()} docs={docs} />
                })
                :
                orderHistory.filter((docs) => docs.date.includes(search) || docs.orderID.includes(search) || docs.status.includes(search))
                .map((docs) => {
                  return <UserOrders key={uuid()} docs={docs} />
                })}
                </TableBody>
              </Table>
            </TableContainer>
</div>
	);
}
