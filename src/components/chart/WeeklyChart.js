import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getWeeklyStats } from "../../firebase/Admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import "../authentication/sign.css";
import "./weeklychart.css";

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
			text: "דוח שבועי",
		},
	},
};

export default function WeeklyChart() {
	const [weeklyStats, setWeeklyStats] = useState();
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getWeeklyStats(startDate, endDate)
				.then(res => {
					setWeeklyStats(getValuesOfObj(res));
				})
				.catch(err => {
					console.log(err);
				});
		}
		return () => {
			isMounted = false;
			setWeeklyStats();
		};
	}, [startDate, endDate]);

	//returns array of all the dates between the 2 choosen dates
	function getDatesInRange(startDate, endDate) {
		const date = new Date(startDate.getTime());

		const dates = [];

		while (date <= endDate) {
			dates.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		return dates;
	}

	let labels = [];
	const range = getDatesInRange(startDate, endDate);

	//iterates over each date and create a new label of the date for labels
	for (let i = 0; i < range.length; i++) {
		labels.push(`${range[i].getDate()}/${range[i].getMonth() + 1}/${range[i].getFullYear()}`);
	}

	const data = {
		labels,
		datasets: [
			{
				label: "מכירות",
				data: weeklyStats,
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	//format the obj fetched from database
	const getValuesOfObj = obj => {
		let arr = [];
		for (const key in obj) {
			for (let i = 0; i < labels.length; i++) {
				if (labels[i] === key) {
					arr[i] = obj[key];
				}
			}
		}
		return arr;
	};

	const _MS_PER_DAY = 1000 * 60 * 60 * 24;

	// makes sure the choosen end date is not earlier than the starting date
	function dateDiffInDays(a, b) {
		// Discard the time and time-zone information.
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((utc2 - utc1) / _MS_PER_DAY);
	}

	const handleSubmit = e => {
		e.preventDefault();
		if (checkInput(e)) {
			setError("");
			setSuccess(true);
			console.log(weeklyStats);
		}
	};

	const checkInput = () => {
		const diff = dateDiffInDays(startDate, endDate);
		if (diff < 0) {
			setError("טווח ימין לא תקין.");
			return false;
		}

		return true;
	};

	const handleStartDateChange = date => {
		setStartDate(date);
		setSuccess(false);
	};

	const handleEndDateChange = date => {
		setEndDate(date);
		setSuccess(false);
	};

	return (
		<>
			{error ? <label style={{ color: "red" }}>{error}</label> : null}
			<form className="inputStyleForm" onSubmit={e => handleSubmit(e)}>
				<div className="inputStyleBox">
					<div className="inputStyle1">
						<label>תאריך התחלתי</label>
						<DatePicker className="dataPicker" locale="he" selected={startDate} onChange={date => handleStartDateChange(date)} />
					</div>
					<div className="inputStyle1">
						<label>תאריך סופי</label>
						<DatePicker className="dataPicker" locale="he" selected={endDate} onChange={date => handleEndDateChange(date)} />
					</div>
				</div>
				<button className="containerbtn inputStyle5 adminPanelBtn" type="submit">
					הצג נתונים
				</button>
			</form>
			{success && <Bar className="chartBox" options={options} data={data} />}
		</>
	);
}
