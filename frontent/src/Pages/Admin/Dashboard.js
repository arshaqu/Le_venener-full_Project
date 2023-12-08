import React, { useState, useEffect } from 'react';

// import AdminNavbar from '../../componets/adminComponent/AdminNavbar'

// import { apiEndPoints } from '../../util/api';
// import { adminRequest } from '../../Helper/instance';
import ReactApexChart from 'react-apexcharts';
import {userRequest} from "./../../axios"
import axios from 'axios';
import AdminHeader from '../../Pages/Admin/AdminHeader'


// import "../../styles/global.css"



function ApexChart() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (val === 0) {
          return '₹' + val; // Display '₹0' for zero values
        } else {
          const formattedValue = `₹${val.toFixed(0)}`; // Format non-zero values
          return formattedValue;
        }
      },
      rotate: -90,
      offsetY: 0,
      style: {
        fontSize: '10px',
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [], // Will be populated with month names
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return '₹' + val;
        },
      },
    },
    title: {
      text: 'Monthly Revenue',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Revenue',
      data: [] // Will be populated with monthly revenue data
    },
  ]);

  useEffect(() => {
    // Fetch data and update chart options and series
    // userRequest({
    //   url: '/api/admin/getDataToDash',
    //   method: 'post',
    //   data: {},
    // })

    

    // .then((response) => {
     



      const fetchData = async()=>{
        try {

          const response = await axios.get('/api/admin/getDataToDash')
          console.log(response,"--------------------------------");
          if (response.data.success) {
            const paymentByMonth = response.data.paymentByMonth;
            const revenueData = Array(12).fill(0); // Initialize an array for 12 months
            console.log("Hiibggbg",userRequest);
    
              // Iterate through the payment data and accumulate revenue by month
              paymentByMonth.forEach((payment) => {
                const month = new Date(payment.date).getMonth();
                revenueData[month] += payment.price;
              });
    
              setChartOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                  ...prevOptions.xaxis,
                  categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                  ],
                },
              }));
    
              setChartSeries([
                {
                  name: 'Revenue',
                  data: revenueData,
                },
              ]);
            }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()



      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};




function Dashboard() {
  const [usercount, setUsercount] = useState('');
  const [salescount, setSalescount] = useState('');
  const [totalrevenue, setTotalrevenue] = useState('')
  const [cancelled, setCancelled] = useState('')

  console.log("hihih",totalrevenue);

  const getData = async() => {
   try {
    const response = await axios.get('/api/admin/getDataToDash')
  
   
   console.log('Making request:', response.data);
   if (response.data.success,"yujgjyg") {
    setUsercount(response.data.user);
    setSalescount(response.data.sales);
    setTotalrevenue(response.data.totalPayment);
    setCancelled(response.data.cancelled);

  }

   } catch (error) {
    console.log(error);
   }
  
      
  };

  useEffect(() => {
    getData();
  }, []);
  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };

  return (

    <div>
      <AdminHeader/>


      {openState === false && (<div className="flex flex-col md:flex-row">

        <div style={{ flex: '75%',fontFamily:'revert-layer' }} className="h-auto admin-content ml-32 mt-40 rounded bg-gray-50 p-4">
          <div className="flex  flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4 md:pl-8 rounded ">
            <div style={{backgroundColor:'#5F7161'}} flex className="bg-gray-500 ml-16  h-36 rounded text-white w-48 h-14 flex flex-col items-center justify-center">
              <h1 style={{fontSize:'20px'}} className='h-auto w-auto' >Users</h1>
              <div className='flex'>
              <p className='mt-3'>Total users: </p>
              <h2 className='ml-3 mt-2'>{usercount}</h2>
              </div>
            </div>
            <div style={{backgroundColor:'#94A684'}} className=" ml-16  h-36 rounded text-white w-60 h-14 flex flex-col items-center justify-center">
            <h1 style={{fontSize:'20px'}} className='h-auto  ' >Total Amount sale</h1>
            <div className='flex'>
              <p style={{fontSize:'15px'}} className='mt-3'>Total Amount: </p>
              <h1 style={{fontSize:'27px'}} className='ml-3 mt-2'>{totalrevenue}</h1>
              </div>
            </div>
            <div style={{backgroundColor:'#5F7161'}} className=" ml-16  h-36 rounded text-white w-60 h-14 flex flex-col items-center justify-center">
            <h1 style={{fontSize:'15px'}} className='h-auto  ' >Total Sales Cancelled</h1>
            <div className='flex'>
              <p style={{fontSize:'15px'}} className='mt-3'> Total  Cancelled: </p>
              <h1 style={{fontSize:'27px'}} className='ml-3 mt-2'>{cancelled}</h1>
              </div>
            </div>
            <div style={{backgroundColor:'#94A684'}} className=" ml-16  h-36 rounded text-white w-60 h-14 flex flex-col items-center justify-center">
            <h1 style={{fontSize:'15px'}} className='h-auto  ' >Total Sales Count</h1>
            <div className='flex'>
              <p className='mt-3'> Sales Count: </p>
              <h1 className='ml-3'>{salescount}</h1>
              </div>
            </div>
          </div>

          <div style={{width:'750px'}} className="w-full ml-64 justify-center mt-12 text-center mt-6">
            <ApexChart className='w-auto'  />
          </div>

          <div className="ml-8 mt-4 text-center">
          <h1 className="font-extrabold text-red-500">
  <span className="text-red-700">Total</span>
  <span className="text-red-600"> Revenue:</span> ₹{totalrevenue}
</h1>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default Dashboard;