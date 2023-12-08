import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Headers from '../Users/Header'

function OrderDetail() {
  const [orderData , setOrderData] = useState('')
  const [product , setProduct] = useState('')
  

  // console.log(orderData);
  const {id} = useParams()

  const fetchData = async ()=>{
    try {
      const response = await axios.post('/api/user/orderDetails',{id})
      setOrderData(response.data.orderData[0]);
      setProduct(response.data.orderData[0].products[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div>
      <Headers/>
          <div style={{backgroundColor:'#gray'}}>

      <div  className='flex'>
        <div style={{ fontFamily: "initial" ,marginLeft:'250px'}} className=" mt-10 m-10">
          
     

        
            <div
                style={{ backgroundColor: "#white" ,width:'1117px'}}
                className="flex flex-col text-bold border mt-1 border-red-700 md:flex-row md:max-w-xxl"
              >

                <img
            className="m-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={`http://localhost:5000/product/${product.productImage}`}
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
    {product.productName}
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
                    Product catagory:<u> {product.productCatagory}</u>
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
                      {product.productColor}
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
                      {product.eventDate}
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
                      {product.count}
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
                      {product.eventPeriod}
                    </p>
                  </div>
                 



                  <div className="text-lg ml-20">
                    <p className="mt-10">   </p>
                    <p
                      style={{ fontWeight: "bold", marginTop: "-15px" }}
                      className="font-normal text-gray-900 dark:text-gray-400"
                    >
                      {product.productDescription}
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
                  className="text-lg flex w-auto  mt-50 ml-30"
                  
                >
                  <p> Amount: </p>
                  <h5
                    style={{ fontWeight: "bold",marginRight:'100px' }}
                    className=" font-normal  ml-5  text-gray-900 dark:text-gray-400"
                  > {product.productPrice}/-
                  </h5>
                </div>
              </div>
        
                  <div className='border mt-4'>
                  <h1 className='ml-4'><u>Delivery Address </u></h1>
                  <div className='flex'>
                    <h5 className='ml-8' >User Name </h5>
                    <h4 className='bold'>:   {orderData.userName}</h4>
                    <h5 className='ml-12'>User Address</h5>
                    <h4 className='bold'>:   {orderData.deliveryAddress}</h4>

                  </div>
                  <div className='flex'>
                    <h5 className='ml-8' >Order Status </h5>
                    <h4 className='bold'>:   {orderData.history}</h4>
                    <h5 className='ml-12'>payment Id</h5>
                    <h4 className='bold'>:   {orderData.paymentId}</h4>
                    <h5 className='ml-40'>Total Amount</h5>
                    <h4 className='bold color-green-300'>:   {orderData.totalAmount}/-</h4>
                  </div>
                  </div>
            
        {/* })} */}
        {/* )}) */}
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
    </div>

  )
}

export default OrderDetail
