import React, { useEffect, useState } from "react";
import "./chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStats,getWeeklyStats } from "../../firebase/Admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import he from 'date-fns/locale/he';


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
      getWeeklyStats(startDate,endDate)
      .then((res) => {
        setWeeklyStats(getValuesOfObj(res))
      })
      .catch((err) => {
        console.log(err)
      })
		}
		return () => (isMounted = false);
  },[startDate,endDate])


	let labels = [];
    for (var i = startDate.getDate(); i <= endDate.getDate(); i++) {
        labels.push(i);
    }

	const data = {
		labels,
		datasets: [
			{
				label: "מכירות",
				data: weeklyStats,
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};
  
	const getValuesOfObj = obj => {
		let arr = Object.values(obj);
		return arr;
	};


  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkInput(e)){
      setError("");
      setSuccess(true);
      console.log(weeklyStats)
    }
  }

  const checkInput = () => {
    const diff = dateDiffInDays(startDate, endDate);
		if (diff < 0 || diff > 7) {
			setError("טווח ימים לא תקין, טווח יכול להיות עד 7 ימים.");
			return false;
		}

		return true;
	};

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setSuccess(false);
    }

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setSuccess(false);
    }

	return (
        <>
        {error ? <label style={{ color: "red" }}>{error}</label> : null}
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>תאריך התחלתי</label>
          <DatePicker locale="he" selected={startDate} onChange={(date) => handleStartDateChange(date)} />
          <label>תאריך סופי</label>
          <DatePicker locale="he" selected={endDate} onChange={(date) => handleEndDateChange(date)} />
          <button type="submit">הצג נתונים</button>
        </form>
        {success && <Bar className="chartBox" options={options} data={data} />}
        </>
	);
}
