import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,  } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './Home.css';
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

function Cart() {
  const dispatch = useDispatch()
  // const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState();
  console.log(total);

  const getproduct = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/user/getcart",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      
      console.log(response);

      if(response.data.message==='Products are empty in the cart'){
        dispatch(hideLoading())
      }else{
        dispatch(hideLoading())
        setTotal(response.data.Total)
        setProduct(response.data.product);
      }
   
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  useEffect(() => {
    getproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
      <Header />
      <div style={{ fontFamily: "initial", marginLeft: "430px" }} className=" mini flex mini_header mt-3">

  <h4 style={{ color: "red" }} className="m-2  cart ">
    Cart
  </h4>
  <div style={{ width: "220px", height: "3px", backgroundColor: "gray" }} className=" mini ml-2 mt-4 "></div>
  <h4 className="m-2 ">Delivery</h4>
  <div style={{ width: "220px", height: "3px", backgroundColor: "gray" }} className="ml-2 mt-4 mini "></div>
  <h4 className="m-2 ">Payment</h4>
</div>

<div style={{ fontFamily: "initial" }} className="mt-9 mx-10">
  {
    product.length>0 ? (
      product?.map((product) => (
          <div key={product._id} className="flex flex-col text-bold border mt-1 border-red-700 md:flex-row md:h-60 md:max-w-xxl">
          <img
            className="m-3 object-cover w-full rounded-t-lg h-90 md:h-58 md:w-48 md:rounded-none md:rounded-l-lg"
            src={`http://localhost:5000/product/${product.productImage[0]}`}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 style={{ color: "#7E5A0C",}} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.productName}
            </h5>
            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
              Quantity: {product.count}
            </p>
    
            <p className="mt-3 font-normal text-gray-900 dark:text-gray-400">
              Model Number: <u>{product.productModel}</u>
            </p>
            <div>
              <p className="mt-2 font-normal text-gray-900 dark:text-gray-400">Color you Ordered:</p>
              <p style={{ fontWeight: "bold", color: "red", marginTop: "-10px" }}>{product.productColor}</p>
            </div>
          </div>
    
          <div className="text-lg ml-20">
            <p className="mt-20">Catagory: </p>
            <p style={{ fontWeight: "bold", marginTop: "-15px" }} className="font-normal text-gray-900 dark:text-gray-400">
              {product.productCatagory}
            </p>
          </div>
    
          <div className="text-lg ml-20">
            <p className="mt-20">Description: </p>
            <p style={{ fontWeight: "bold", marginTop: "-15px" }} className="font-normal text-gray-900 dark:text-gray-400">
              {product.productDescription}
            </p>
    
          <div className="flex items-center mt-5">
      <h6 className="mt-">EventPeriod:</h6>
      <h5 >{product.eventPeriod}</h5>
          </div>
    </div>
    <div className="flex items-center mb-4">
      <h6 style={{marginLeft:'60px'}} className="ml-3">EventDate:</h6>
      <p style={{ width: '100px' }} className="ml-2 mt-2">
        {formatDate(product.eventDate)}
      </p>
    </div>
    
          <div
            style={{
              fontWeight: "bold",
              marginTop: "190px",
              color: "red",
            }}
            className="text-lg"
          >
            <h5 style={{marginLeft:'-100px'}} className="mb-3 font-normal text-gray-900 dark:text-gray-400">
              <u>Rental Price(One Day)</u> ₹ {product.productPrice}
            </h5>
          </div>
          
        </div>
        
        
      ))
    ):(
      <div className="flex justify-center items-center w-full">
        <h3 style={{color:'#red'}} className="">Nothing in the cart Please Add Something...</h3>
      </div>

  
)
}
<div
    style={{
      width: "100%",
      backgroundColor: "#white",
      borderBottom: "10px",
      fontFamily: "serif",
    }}
    className="flex flex-col mt-2 w-max-full text-bold text-bold border border-red-700 md:flex-row md:max-w-xxl"
  >
    <h1 style={{ fontSize: "20px", fontWeight: "bold" }} className="m-4">
      <u>Cost Summary</u>
    </h1>
    <div></div>
    <h4 style={{fontSize:'19px'}} className="mt-20">Rental Amount: </h4>
    <h1 style={{ fontWeight: "bold", fontSize: "20px" }} className="mt-20 ml-2">
      ₹ {total}/-
    </h1>

    <div className="ml-20">
      <h4 style={{ fontWeight: "bold",fontSize:'19px' }} className="mt-10">
        Delivery Rules:{" "}
      </h4>
      <p>
        Free Delivery And Pickup's On
        <br /> Minimum order of 1000/-
      </p>
    </div>

    <div className="ml-20">
      <h4 style={{ fontWeight: "bold",fontSize:'19px' }} className="mt-10">
        Conditions:{" "}
      </h4>
      <p>
        If the Customers you rented got any <br /> type of damage and Scratch you
        <br /> Should pay the full amount the product.
      </p>
    </div>

    <div style={{ fontWeight: "bold" }} className="ml-20">
      <p className="mt-10 ml-40 mr-2 mb-2 total">Total Amount to Be Paid</p>
      <p style={{ color: "green", fontSize: "20px" }} className="ml-40 text-lg mr-2 mb-2">
        ₹ {total}/-
      </p>
      <button
        style={{ backgroundColor: "#EC145B", color: "white" }}
        type="button"
        onClick={() => navigate("/addressing", toast.success("Redirecting to Delivery Details"))}
        className="py-2.5 buttoning px-5 ml-40 text-md font-medium text-gray-900 rounded-lg border 
                border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
                dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Place order
      </button>
    </div>
  </div>
</div>

      <Footer />
    </div>
    </div>
  );
}

export default Cart;
