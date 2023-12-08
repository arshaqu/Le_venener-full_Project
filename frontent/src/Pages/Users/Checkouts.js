import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Checkout() {

  
  const {id}  = useParams()

    console.log(id);

  const [data, setData] = useState([]);
  const [products, setproducts] = useState('');
  const [amount,setAmount] = useState('')
  const [address,setAddress] = useState('')
  const [orderid , setOrderid] = useState('')
  
  const navigate = useNavigate();

  const getData = async () => {
    try {
          const response = await axios.post("/api/user/getorder", {id}, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        // console.log(response.data.addresData[0]);
        setOrderid(response.data.data._id);
        setAmount(response.data.Total);
      setAddress(response.data.addresData[0]);
      setData(response.data);
      setproducts(response.data.data.products)
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  useEffect(() => {
    getData();
  }, []); // Provide an empty dependency array to run the effect once when the component mounts



//  let amount = 100
  const Razorpay = (e) =>{
    e.preventDefault()
    
      var options = {
        key: "rzp_test_LarllNYjBbsQE5",
        key_secret:"uRYhTQETdBPllUGu5FcKBLyF",
        amount:amount * 100,
        currency:"INR",
        name:"Le Venner",
        description:"Just For The Text Purpose",
        handler: function async(response){
          // console.log(response.razorpay_payment_id);
          console.log(response.razorpay_payment_id);
          const { razorpay_payment_id: payment_id } = response;
          if(response){
            const updateStatus = axios.post("/api/user/updateStatus", {payment_id,id}, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
            navigate('/')
          }
        },
        prefill:{
          name:"Arshaquu",
          email:"Muhammedarshaque@gmail.com",
          contact : "9561478543"
        },
        notes:{
          address:"Razorpay Coperative Office"
        },
        theme:{
          color:'#FF7000'
        }
      }
      var pay = new window.Razorpay(options);
      pay.open()
    
  }

  const originalDate = new Date(data.date);

const dd = String(originalDate.getDate()).padStart(2, '0');
const mm = String(originalDate.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1
const yyyy = originalDate.getFullYear();

const formattedDate = `${dd}-${mm}-${yyyy}`;


// const productPrices =

  return (
    <div>
      <Header />
      <div
        style={{ fontFamily: "initial", marginLeft: "450px" }}
        className=" flex mt-3 "
        >
        <h4  className="m-2">
          Cart
       
        </h4>
        <div
          style={{ width: "220px", height: "3px", backgroundColor: "gray" }}
          className="ml-2 mt-4 "
        ></div>
        <h4 className="m-2">Delivery</h4>
        <div
          style={{ width: "220px", height: "3px", backgroundColor: "gray" }}
          className="ml-2 mt-4 "
        ></div>
        <h4 style={{ color: "red" }} className="m-2">Payment</h4>
      </div>



      
      <div className='flex'>
        <div style={{ fontFamily: "initial" ,marginLeft:'250px'}} className=" mt-10 m-10">
          
     

        {
          Array.isArray(products) && products.map((item) => (
            <div
                style={{ backgroundColor: "#white" ,width:'1117px'}}
                className="flex flex-col text-bold border mt-1 border-red-700 md:flex-row md:max-w-xxl"
              >
                <img
                  className="m-4 checkoutImage object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={`http://localhost:5000/product/${item.productImage[0]}`}
                  alt=""
                />

                <div  className="flex flex-col justify-between p-4 leading-normal">
                  
                <h6
  style={{
    color: "#7E5A0C",
    font: "revert",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "40px",
    fontFamily: "Your Font Family",
  }}
  className=" text-1xl font-bold tracking-tight text-gray-900 "
>
  Product Name:{" "}
  <span
    style={{
      fontWeight: "bold",
      fontSize: "22px", // Adjust the font size for the product name here
    }}
  >
    {item.productName}
  </span>
</h6>
                  <p
                    style={{ fontWeight: "bold" }}
                    className=" text-lg font-normal text-gray-700 dark:text-gray-400"
                  >
                    
                  </p>

                  <p
                    style={{ fontWeight: "bold" }}
                    className=" font-normal text-gray-900 dark:text-gray-400"
                  >
                    Product catagory:<u> {item.productCatagory}</u>
                  </p>
                  <div>
                    <p className=" font-normal text-gray-900 dark:text-gray-400">
                      Color you Ordered:
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginTop: "-10px",
                      }}
                    >
                      {item.productColor}
                    </p>
                  </div>

                 

                </div>
                <div>
                  <div className="text-lg ml-20">
                    <p className="mt-20"> Ordered Date : </p>
                    <p
                      style={{ fontWeight: "bold", marginTop: "-15px" }}
                      className="font-normal text-gray-900 dark:text-gray-400"
                    >
                      {formatDate(item.eventDate)}
                    </p>
                  </div>


                  <div style={{margin:'10px', marginLeft:'80px'}} className='m'>
                    <p className="mt-2 font-normal text-gray-900  dark:text-gray-400">
                      Product Count
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginTop: "-10px",
                      }}
                    >
                      {item.count}
                    </p>
                  </div>


                  
                  <div style={{margin:'10px', marginLeft:'80px'}} className='m'>
                    <p className="mt-2 font-normal text-gray-900  dark:text-gray-400">
                      Rent Period
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginTop: "-10px",
                      }}
                    >
                      {item.eventPeriod}
                    </p>
                  </div>
                 



                  <div className="text-lg ml-20">
                    <p className="mt-10">   </p>
                    <p
                      style={{ fontWeight: "bold", marginTop: "-15px" }}
                      className="font-normal text-gray-900 dark:text-gray-400"
                    >
                      {item.productDescription}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "200px",
                    marginTop: "180px",
                    color: "#red",
                  }}
                  className="text-lg  mt-50 ml-30"
                  
                ><p>Amount to be paid</p>
                  <h5
                    style={{ fontWeight: "bold",marginRight:'100px' }}
                    className=" font-normal  text-gray-900 dark:text-gray-400"
                  >Price : {item.productPrice}  /-
                  </h5>
                </div>
              </div>
          ))
        }

            
        {/* })} */}
        {/* )}) */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#white",
              borderBottom: "10px",
              fontFamily: "serif",
            }}
            className="flex flex-col mt-2 w-max-full text-bold  text-bold border border-red-700 md:flex-row md:max-w-xxl"
          >
          <p className='m-4 ' style={{fontWeight:'bold'}}>ORDER DETAILS</p>
          <p className='mt-5'> Order Date :  {}</p>
            <div  >
          
          <p style={{fontWeight:'bold'}}  className='mt-5 ml-3'> Mobile Number:  {address.mobile}</p>
          </div>
          <p  className='mt-5 ml-3'> Delivery Address:  {address.address}</p>
          <div className='f'>
          <p style={{ fontWeight:'bold'}} className='mt-2 '>User Name : {address.userName}</p>
          <h6 style={{marginLeft:'10px' ,fontWeight:'bold' ,color:'green'}} className='mt-2 '>Total Amount : {amount} /-</h6>
          </div>
          </div>
        </div>
      </div>

              <div className='container'>

      <button onClick={Razorpay} style={{marginLeft:'800px',width:'200px' }} type="button" className="text-white centered-button  bg-pink-700 hover:bg-pink-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay the Amount</button>
              </div>

    </div>
  )
}

export default Checkout
