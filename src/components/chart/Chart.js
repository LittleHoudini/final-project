import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStats,getWeeklyStats } from "../../firebase/Admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import he from 'date-fns/locale/he';
import WeeklyChart from './WeeklyChart';

registerLocale('he', he)
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
  const [weeklyStats, setWeeklyStats] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getStats()
				.then(res => {
					// console.log(res);
					setStats(getValuesOfObj(res));
				})
				.catch(err => {
					console.log(err);
				});
		}
		return () => (isMounted = false);
	}, []);
  


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
		let arr = Object.values(obj);
		return arr;
	};




	return (
		<div className="wrapper66">
			<div className="wrapperInside">
				<div className="titleDiv">
					<h1 className="titleDiv"> דוח מכירות חודשי</h1>
					<p>דוח מכירות חודשי </p>
				</div>

				<Bar className="chartBox" options={options} data={data} />
        <WeeklyChart />
			</div>
		</div>
	);
}
