import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStats } from "../../firebase/Admin";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";


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
		return () => {
			isMounted = false;
			setStats();
		};
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

	return <Bar className="chartBox" options={options} data={data} />;
}
