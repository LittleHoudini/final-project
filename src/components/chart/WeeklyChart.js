import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStats, getWeeklyStats } from "../../firebase/Admin";
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
					console.log(res);
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

	function getDatesInRange(startDate, endDate) {
		const date = new Date(startDate.getTime());

		const dates = [];

		while (date <= endDate) {
			dates.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		return dates;
	}

	const range = getDatesInRange(startDate, endDate);
	let labels = [];
	let flag = false;
	let idx = -1;
	const daysInCurrMonth = getDaysInMonth(startDate.getMonth(),startDate.getFullYear());
	for (var i = 0; i < range.length; i++) {
		if(flag){
			idx = i;
			flag = false;
		}
		labels.push(range[i].getDate());
		if(range[i].getDate() === daysInCurrMonth){
			flag = true;
		}
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


	const getValuesOfObj = obj => {
		let arr = [];
		const start = startDate.getDate();
		Object.keys(obj).forEach(key => {
			if (Number(key) === start && labels.length <= daysInCurrMonth) {
				arr[Number(key) - start] = obj[key];
			}
			if (Number(key) > start) {
				arr[Number(key) - start] = obj[key];
			}
			if(Number(key) < start ){
				arr[idx++] = obj[key]
			}
			

		});
		idx = -1;
		return arr;
	};

	function getDaysInMonth(m, y) {
		return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
	}

	const _MS_PER_DAY = 1000 * 60 * 60 * 24;

	// a and b are javascript Date objects
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
		if (diff < 0 || diff > daysInCurrMonth-1) {
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
			<form onSubmit={e => handleSubmit(e)}>
				<label className="inputStyle">תאריך התחלתי</label>
				<DatePicker className="inputStyle" locale="he" selected={startDate} onChange={date => handleStartDateChange(date)} />
				<label className="inputStyle">תאריך סופי</label>
				<DatePicker className="inputStyle" locale="he" selected={endDate} onChange={date => handleEndDateChange(date)} />
				<button className="containerbtn" type="submit">
					הצג נתונים
				</button>
			</form>
			{success && <Bar className="chartBox" options={options} data={data} />}
		</>
	);
}
