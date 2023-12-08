import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './Home.css';
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


<style>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200&display=swap');
</style>
function Outfitdetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
 

  const [values, setValues] = useState({
    eventDate: null, // Initialize eventDate with null
    rentPeriod: '7',
  });
  const [bookedDates, setBookedDates] = useState([]);
  const [eventDate, setEventDate] = useState(null); 
  console.log(eventDate,"Evetn");


  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => bookedDate?.toISOString().split('T')[0] === date);
  };



  const getproduct = async () => {
    dispatch(showLoading())
    const response = await axios.post("/api/user/details", { id }, {
      headers: { Authorization: "Bearer " + localStorage.getItem('token') },
    });
    dispatch(hideLoading())
    setProduct(response.data.product);
    setEventDate(response.data.product.eventDate)

  };



  // const fetchBookedDates = async () =>{
  //   try {
  //     const response = await axios.post("/api/user/bookedDates", {  }, {
  //       headers: { Authorization: "Bearer " + localStorage.getItem('token') },
  //     });
  //     console.log(response.data.dataObjects);
  //     const dates = response.data.orderData.map(order => new Date(order.date));
  //     setBookedDates(dates);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const fetchdate = async () => {
  //   // const response = await axios.get  (`/api/user/getproductdates?id=${id}`) 
  //   // const dateObjects = dateArr.map(dateArr => new Date(dateArr));

  //   // console.log(response, "---------------data");
  //   // setEventdate(response.data)
  //   // setBookedDates(dates);
  // }


  useEffect(() => {
    getproduct();
  },[]);


  // useEffect(()=>{
  //   fetchBookedDates();
  // },[])

  // useEffect(()=>{
  //   fetchdate();
  // },[])

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() );

  const handleRentalPeriodChange = (e) => {
    setValues({ ...values, rentPeriod: e.target.value });
  };

  const handleEventhandle = async (product) => {
    try {
      if (!values.eventDate || !values.rentPeriod) {
        toast.error("Please select both event date and rent period.");
        dispatch(hideLoading());
        return;
      }
  
      const isAlreadyBooked = isDateBooked(values.eventDate.toISOString().split('T')[0]);
      if (isAlreadyBooked) {
        toast.error("Sorry, the product is already booked on that date.");
        dispatch(hideLoading());
        return;
      }
  
      const requestData = {
        id,
        rentPeriod: values.rentPeriod,
        eventDate: values.eventDate,
      };
  
      dispatch(showLoading());
      const response = await axios.post("/api/user/cart", requestData, {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') },
      });
  
      dispatch(hideLoading());
      console.log(response);
      navigate(`/Cart`);
      if (response.data.success) {
        toast.success("Product added to the cart successfully");
      } else {
        toast.error("Product Not Added");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };





  return (
    <div className="pageing1">
      <Header  />
      <div className="fullpage mt-5 mx-96  ">
        <div className="flex">
          <div>
          <img
            style={{ maxWidth: "340px", marginLeft: "-50px" }}
            className="image_detail"
            src={`http://localhost:5000/product/${product?.image}`}
          />
          </div>

          <div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              width: "100%",
              padding: "20px 0 20px 20px",
              display:"flex"
            }}
            className="h-30 detaising widthing bg-gray ml-5"
          >
            <div>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "500px",
                  fontSize: "22px",
                  margin: "0",
                }}
                className="ml-5  fonting"
              >
                {product?.product}
              </p>
              <p
                style={{
                  fontFamily: "serif",
                  fontWeight: "550px",
                  margin: "0",
                }}
                className="ml-5 fonting"
              >
                {product?.description}
              </p>
            </div>
            <div style={{
              padding:"10px 0 10px 30px",
              marginLeft:"30px"
            }}>
              <h3 className="fonting">₹ {product?.price}/- </h3>
              <p></p>
            </div>
          </div>


         <div style={{fontWeight:'100px' ,color:'gray',fontSize:'10px'}} className="flex   ">
         <h5 style={{fontFamily:'ExtraLight ',fontSize:'16px'}} className="ml-20 mt-3 fonting1 ">Color</h5>
          <h5 style={{fontFamily:'ExtraLight',marginLeft:'220px',fontSize:'16px'}} className=" mt-3 fonting1">- {product?.color}</h5>
         </div>
         <div style={{color:'gray'}} className="flex  ">
         <h5 style={{fontFamily:'ExtraLight ',fontSize:'16px'}} className="ml-20 mt-3 fonting1">Model</h5>
          <h5 style={{fontFamily:'ExtraLight',marginLeft:'220px',fontSize:'16px'}} className="fonting1 mt-3">-<ui> {product?.model}</ui></h5>
         </div>
         <div style={{color:'gray'}} className="flex ">
         <h5 style={{fontFamily:'ExtraLight ',fontSize:'16px'}} className="ml-20 mt-3 fonting1 ">Catagory</h5>
          <h5 style={{fontFamily:'ExtraLight',marginLeft:'198px',fontSize:'16px'}} className="fonting1 mt-3">-<ui> {product?.catagory}</ui></h5>
         </div>
         <div  className=" ml-5 h-1 bg-gray-100 fonting1">

         </div>
         <div style={{color:'gray'}} className="flex ">
         <h5 style={{fontFamily:'ExtraLight',fontSize:'16px'}} className="fonting1 ml-20 fonting1 mt-3 ">Size</h5>
          <h5 style={{fontFamily:'ExtraLight',marginLeft:'235px',fontSize:'16px'}} className="fonting1 mt-3">-<ui> {product?.size}</ui></h5>
         </div>
         <div style={{color:'gray'}} className="flex ">
         <h5 style={{fontFamily:'ExtraLight ',fontSize:'16px'}} className="ml-20 mt-3 fonting1">Quantity</h5>
          <h5 style={{fontFamily:'ExtraLight',marginLeft:'202px',fontSize:'16px'}} className="fonting1 mt-3">-<ui> {product?.stock}</ui></h5>
         </div>
          <div  className=" ml-5 h-1 bg-gray-100 fonting1">

          </div>  
            <form>
              <p style={{fontFamily:'cursive',color:'gray',fontSize:'16px'}} className="ml-5 fo mt-2"><u>RENT PERIOD</u> </p>
          <div style={{color:'gray' ,fontFamily:'cursive'}} className="flex flex-wrap fonting1 ml-5">
            
    <div checked={values.rentPeriod === '3'} style={{marginLeft:'40px' ,color:'gray'}} className="flex items-center mr-4 fonting1">
        <input id="red-radio" type="radio" value="3" name="colored-radio"  onChange={(e) => setValues({ ...values, rentPeriod: e.target.value })} className="fonting1 w-4 h-4 ml-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label for="red-radio" className="ml-1  text-gray-900 dark:text-gray-300">3 Days</label>
    </div>
    <div className="flex items-center mr-4 ">
        <input checked={values.rentPeriod === '5'} id="green-radio"  type="radio" value='5' name="colored-radio" onChange={(e) => setValues({ ...values, rentPeriod: e.target.value })}
 className="w-4 ml-4 h-4 dark:border-gray-600"/>
        <label for="green-radio" className="ml-1 text-gray-900 dark:text-gray-300">5 Days</label>
    </div>
    <div  className="flex items-center mr-4">
        <input checked={values.rentPeriod === '7'} id="purple-radio" type="radio" value="7" name="colored-radio" onChange={(e) => setValues({ ...values, rentPeriod: e.target.value })}
 className="w-4 ml-4 h-4 text-purple-600  bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label for="purple-radio" className=" text-gray-900 dark:text-gray-300 ml-1">7 Days</label>
    </div>
   
</div>


         
<div className="ml-5 flex mt-3 fonting1">
  <label style={{ fontFamily: 'cursive', color: 'gray' }} className="block mt-2 font-medium" htmlFor="date">
    EVENT DATE   :
  </label>
<DatePicker
  onChange={(date) => setValues({ ...values, eventDate: date })}
  selected={values.eventDate}
  minDate={tomorrow}  // Set minDate to disallow past dates
  showYearDropdown
  showMonthDropdown
  dropdownMode="select"
  dateFormat="dd/MM/yyyy"
  className={`ml-3 p-2 border rounded ${
    values.eventDate && isDateBooked(values.eventDate?.toISOString()?.split('T')[0])
      ? 'text-red-100'
      : 'text-gray-900'
  }`}
/>

        {values.eventDate && isDateBooked(values.eventDate?.toISOString()?.split('T')[0]) && (
          <span className="ml-2 text-red-500">&#10060;</span>
        )}
      </div>
          </form>
          </div>
          
        </div>
          
        
      </div>
      <div style={{ marginLeft: "420px" }} className="fonting1 mt-3">
        <p style={{fontSize:'14px'}}  className="font padd">
          * In case of outfit booking: rent is for outfit only, accessories are
          not included.
        </p>
        <p style={{fontSize:'14px'}} className="paddings">
          * In case of accessories: rent is for accessories only, outfit are not
          included.
        </p>
      </div>

      <div style={{ marginLeft: "400px" ,color:'gray' ,fontSize:'16px'}} className="mt-1 ">
        <p  className="font-bold paddi">Refundable Deposite Amount: </p>
        <p style={{fontSize:'14px'}} className="paddi">
          1. Booking per product upto Rs. 2500 will be charged Rs.5000
          refundable security deposit.
        </p>
        <p style={{fontSize:'14px'}} className="paddi">
          2. Bookings per product above Rs. 2500 upto Rs. 5000 will be charged
          Rs. 8000 refundable security deposit.
        </p >
        <p style={{fontSize:'14px'}} className="paddi">
          3. Bookings per product above Rs. 5000 upto Rs. 10000 will be charged
          Rs. 10000 refundable security deposit.
        </p>
        <p style={{fontSize:'14px'}} className="paddi">
          4. Bookings per product above Rs. 10000 and above will be charged Rs.
          15000 refundable security.
        </p>
        <p style={{fontSize:'14px'}} className="paddi">
          5. Bookings per product above Rs. 15,000 and above will be charged Rs.
          20,000 refundable security deposit.
        </p>
      </div>

      <div>
        <div
          style={{ marginLeft: "450px", marginTop: "80px" ,color:'white' }}
          className="ml-500 padding"
        >
<Link to={"/chat"} >
  
      <button
            style={{ backgroundColor: "#0B928A",color:'#f9f9f9',marginLeft:'-70px' }}
            className="py-2.5 px-5  buttns text-lg font-bold rounded-lg border border-black-800 hover:text-orange-700 focus:z-10 focus:ring-4 flex items-center"
          >
            <BsFillChatLeftTextFill style={{color:'#white'}} className="mr-2 chats" /> Chat{" "}
          </button>
          </Link>

        </div>
        <div
          style={{ marginLeft: "850px", marginTop: "-50px" }}
          className="ml-500"
        >
          <button
            style={{ backgroundColor: "#EC145B" }}
            onClick={() => handleEventhandle(product?._id)}
            className="py-2.5 px-5 ml-2 text-lg buttns2 font-bold text-white rounded-lg border border-black-800 transition duration-300 ease-in-out hover:bg-green-900 hover:text-white focus:z-10 focus:ring-4 flex items-center"
          >
            <HiOutlineShoppingCart  className="mr-2 addcart" /> AddCart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Outfitdetails;
