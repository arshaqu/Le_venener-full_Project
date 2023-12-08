import React from 'react';
// import './adminadminLogin.css';
import {  FaEnvelope, FaKey } from 'react-icons/fa';
import { FaAmilia } from 'react-icons/fa';
import { Input, Form, Button } from 'antd';
import {  AiFillEyeInvisible } from "react-icons/ai";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function show() {  
 
  const inputElement = document.getElementById('hide');
  if (inputElement) {
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
    } else {
      inputElement.type = 'password';
    }
  }
}

function AdminLogin() {
  const navigate=useNavigate()
 const onFinish=async(values)=>{
    console.log("val",values)
    try {
      const response = await axios.post('/api/admin/adminLogin',values)
      console.log(response)
      if(response.data.success){
         toast.success(response.data.message)
         toast("Redirecting to Dashboard page")
         localStorage.setItem('admintoken',response.data.data)
         navigate('/admin/dashboard')
      }else{
         toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong...") 
    }
  }
  return (
    <div className='Authentication bg img'>
      <div className='adminLogin-form inner_box'>
        <h1 className='Regist'>Login</h1>
        <Form layout='vertical' onFinish={onFinish}>
          
          <div className='content'>
            <div className='combo'>
              <FaEnvelope className='usersicon icons' />
              <Form.Item
                name='email'
                className='userCharacter'
                label='Email'
                // rules={[
                //   {
                //     required: true,
                //     type: 'email',
                //     message: 'Please input a valid email address!',
                //   },
                // ]}
              >
                <Input className='inputB' placeholder='Enter Your Email' />
              </Form.Item>
            </div>
          </div>
          <div className='content'>
            <div className='combo'>
              <FaKey className='usersicon icons' />
              <Form.Item
                name='password'
                className='userCharacter'
                label='Password'
                type='text'
              >
                <div className='contend'>
                <div>
                <Input
                  className=' inputB'
                  placeholder='Enter your Password'
                  type='password'
                  id='hide'
                  />
                </div>
                <FaAmilia/>
                  <div className='eye' onClick={show}>
                  <AiFillEyeInvisible/>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
           
          <Form.Item>
            <Button type='primary' htmlType='submit' className='btn'>
              adminLogin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}


export default AdminLogin;
