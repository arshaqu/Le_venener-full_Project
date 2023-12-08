import React from "react";
import "./Login.css";
import 'lottie-react'
import { Input, Form, Button } from "antd";
import { AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import logoi from "../../assets/le venner.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useDispatch} from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import image1 from '../../assets/Bride1.jpg'



function show() {
  const inputElement = document.getElementById("hide");
  if (inputElement) {
    if (inputElement.type === "password") {
      inputElement.type = "text";
    } else {
      inputElement.type = "password";
    }
  }
}

function Login() {
  // const {loading} = useSelector(state => state.alerts)
  // console.log(loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log("val", values);
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/login',values)
      dispatch(hideLoading())
      // console.log(response.data.message,"response" );
      if(response.data.success === false){
        toast.error("Otp is not Verified, please enter your otp");
        navigate('/otp')
        }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      
      }
      
       else {
     
        toast.error(response.data.message);
        dispatch(hideLoading())
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      // navigate("/otp")
      dispatch(hideLoading())

    }
  };
  return (
    <div className="Authentication bgi img " >
      
<div  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img style={{height:'420px' ,width:"280px"}} class=" object-cover ml-2  w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={image1} alt="" />
    <div class="flex flex-col p-5 justify-between p-4 leading-normal">
      <div style={{marginLeft:'60px'}} className="flex ">
    <img style={{height:'60px'}} className="mt-2 fgh" src={logoi} />

      <h1 className="logisn p-1 ">Login</h1>
      </div>
    <Form layout="vertical" onFinish={onFinish}>
          <div className="">
            <div className="w-full">
              <Form.Item 
                name="email"
                className="userCharacter"
                label="Email"
             
              >
                <Input style={{width:"100px"}}  className="inputB1" placeholder="Enter Your Email" />
              </Form.Item>
            </div>
          </div>
          {/* <div className="content">
            <div className="combo"> */}
              <Form.Item
                name="password"
                className="userCharacter"
                label="Password"
                type="text"
              >
                <div className="contend">
                  
                    <Input
                    style={{width:'37px'}}
                      className=" inputB1"
                      placeholder="Enter your Password"
                      type="password"
                      id="hide"
                    />
                  <div className="eye" onClick={show}>
                    <AiFillEyeInvisible style={{alignItems:'end'}}/>
                  </div>
                </div>
              </Form.Item>
            {/* </div>
          </div> */}

          <Form.Item>
            <Button style={{marginLeft:'7px'}} type="primary" htmlType="submit" className="btn">
              Login
            </Button>
          </Form.Item>
          <a className="h_refs" href="/register">
            Here for SignUp
          </a>
          <a className="forget" href="/forget">
            forget password
          </a>
        </Form>
    </div>
</div>



      </div>
    
    
  );
}

export default Login;
