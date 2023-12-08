import React from 'react';
import { Button, Input, Form } from 'antd';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Forget_pass() {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values)
    try {
      const response = await axios.post("/api/user/forget", values);
     
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/forget");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const emailrule = [
    { required: true, message: "Fill the Email field" },
    
  ];

  return (
    <div className='Authentication bgf-img'>
      <div className='otp-form inner_boxeril'>
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className='Forget'>Forget Password</h1>
          <p className='texters'>Enter Your Email To Verify Your Account</p>
          <Form.Item rules={emailrule} name="email">
            <Input className='sizingz' type='email' size="large" placeholder="Enter Your Email here..." />

          </Form.Item>
          <Form.Item>
            <Button style={{alignItems:'center'}} className='submitbtn' type="primary" danger htmlType='submit'>
              Change Password
            </Button>
          </Form.Item>
        
         
        </Form>
      </div>
    </div>
  );
}
