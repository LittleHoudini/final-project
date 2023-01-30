import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStats } from "../../firebase/Admin";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import { textAlign } from "@mui/system";


registerLocale("he", he);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "דוח חודשי",
		},
	},
};

export function Chart() {
	const [stats, setStats] = useState();
	const [year, setYear] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getStats(year)
				.then(res => {
					console.log(res);
					setStats(getValuesOfObj(res));
				})
				.catch(err => {
					console.log(err);
				});
		}
		return () => {
			isMounted = false;
			setStats();
		};
	}, [year]);

	const labels = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

	const data = {
		labels,
		datasets: [
			{
				label: "מכירות",
				data: stats,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	const getValuesOfObj = obj => {
		// let arr = Object.values(obj);
		let arr = [];
		for (let i = 0; i < 12; i++) {
			arr[i] = 0;
		}
		for (const key in obj) {
			arr[key] += obj[key];
		}
		console.log("arr" , arr)
		return arr;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (checkInput(e)) {
			setError("");
			setSuccess(true);
		}
	};

	const checkInput = () => {
		const dt = new Date();
		if (year < 2016 || year > dt.getFullYear()) {
			setError("שנה לא תקינה.");
			setSuccess(false);
			return false;
		}

		return true;
	};

	return (
		<>	
			<div className="chart-input">
			{error ? <p style={{ color: "red", textAlign:"center"}}>{error}</p> : null}
				<form onSubmit={e => handleSubmit(e)}>
					<label style={{display:"block"}} htmlFor="year">בחר שנה</label>
					<input className="inputStyle" onChange={(e) => setYear(e.target.value)} value={year} onKeyPress={event => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}></input>
					
					<button className="containerbtn inputStyle5 adminPanelBtn" type="submit">
						הצג נתונים
					</button>
				</form>
			</div>
			{success && <Bar className="chartBox" options={options} data={data} />}
		</>
		);
}
