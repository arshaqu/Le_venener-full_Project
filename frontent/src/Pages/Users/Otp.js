import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const[emails,setEmail]=useState("")
 
const email=location.state
// setEmail(email)
console.log("get",email)

  const onFinish = async (values) => {
    // console.log(values)
    values.email=email
    console.log(values)
    try {
      const response = await axios.post("/api/user/otp", values);
     

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const otpRule = [
    { required: true, message: "Fill the OTP field" },
    { min: 4, max: 4, message: "Enter the four-digit OTP" },
  ];

  return (
    <div className='Authentication bgf-img1'>
      <div className='otp-form inner_boxeril1'>
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className='Regist'>OTP VERIFICATION</h1>
          <Form.Item rules={otpRule} name="otp">
            <Input className='sizing' type='number' size="large" placeholder="Enter Your OTP here..." />

          </Form.Item>
          <Form.Item>
            <Button className='butn' type="primary" danger htmlType='submit'>
              Submit 
            </Button>
          </Form.Item>
          <Form.Item value={emails} name="email">
            <Input className='sizing' values={emails} type='hidden' size="large" placeholder="" />

          </Form.Item>
         
        </Form>
      </div>
    </div>
  );
}
