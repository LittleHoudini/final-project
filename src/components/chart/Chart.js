import React, {useEffect,useState} from 'react';
import './chart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import {getStats} from '../../firebase/Admin';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'דוח חודשי',
    },
  },
};

// console.log(data.datasets[0].data)

export function Chart() {
  const [stats,setStats] = useState();
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      getStats().then((res) => {
        setStats(getValuesOfObj(res))
      })
      .catch((err) => {
        console.log(err)
      })
    }
    return () => isMounted = false;

  },[])

  const labels = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

 const data = {
  labels,
  datasets: [
    {
      label: 'מכירות',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data : stats,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      
    }
  ],
};


const getValuesOfObj = (obj) => {
  let arr = [];
  Object.keys(obj).forEach(key => {
   
    if(key === '01'){
      arr[0] = obj[key]
    }
    else if(key === '02'){
      arr[1] = obj[key]
    }
    else if(key === '03'){
      arr[2] = obj[key]
    }
    else if(key === '04'){
      arr[3] = obj[key]
    }
    else if(key === '05'){
      arr[4] = obj[key]
    }
    else if(key === '06'){
      arr[5] = obj[key]
    }
    else if(key === '07'){
      arr[6] = obj[key]
    }
    else if(key === '08'){
      arr[7] = obj[key]
    }
    else if(key === '09'){
      arr[8] = obj[key]
    }
    else if(key === '10'){
      arr[9] = obj[key]
    }
    else if(key === '11'){
      arr[10] = obj[key]
    }
    else if(key === '12'){
      arr[11] = obj[key]
    }
  });
  return arr;
}




return ( 
  
  <div className="wrapper66"> 
   <div className="wrapperInside">
  
			<div className="titleDiv">
				<h1 className="titleDiv"> דוח מכירות חודשי</h1>
				<p>דוח מכירות חודשי </p>
				</div>
	 	
  <Bar className="chartBox" options={options} data={data}/>
  </div>
  </div>
  
  );
}
