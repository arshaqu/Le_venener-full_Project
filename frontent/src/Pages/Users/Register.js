import React, { useState } from 'react';
import './Register.css';
import {  useNavigate } from "react-router-dom"
import { Input, Form, Button } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast'
import {  AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

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

function Register() { 
  const dispatch = useDispatch()
  const[email,setEmail]=useState("")
  const navigate = useNavigate();
  


  const onFinish=async(values)=>{
    console.log(values.email,"emailll") 
    setEmail(values.email)

    console.log("hii",email)
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/register',values)
      dispatch(hideLoading())
      if(response.data.success){
         toast.success(response.data.message)
         toast("Redirecting to login page")
         navigate('/otp',{state:values.email});
      }else{
        dispatch(hideLoading())
         toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong...") 
    }
  }
  return (
    <div className='Authentication bgr img'>
      <div className='Register-form inner_box border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <h1 className='Registe'>User Register</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='content'>
            <div className='combo'>
              <Form.Item name='name' className='userCharacter ' label='Name'>
                <Input  className='inputB col-md-12 col-12 col-lg-12' placeholder='Enter Your Name' />
              </Form.Item>
            </div>
          </div>
          <div className='content'>
            <div className='combo'>
              <Form.Item
            
                name='email'
                className='userCharacter'
                label='Email'
             
              >
                <Input className='inputB' placeholder='Enter Your Email' />
              </Form.Item>
            </div>
          </div>
          <div className='content'>
            <div className='combo'>
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
                  <div className='eye' onClick={show}>
                  <AiFillEyeInvisible style={{alignItems:'end'}}/>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
          <div className='content'>
            <div className='combo'>
              <Form.Item
                name='phone'
                className='userCharacter'
                label='Phone'
              >
                <Input style={{width:'200% !important'}} className='inputB' placeholder='Enter Your Phone Number' />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button style={{marginLeft:'1px'}} type='primary' htmlType='submit'  className='btn1'>
              Register
            </Button>
          </Form.Item>
          
          <a className='h_refs' href="/">click here for login</a>
         
        </Form>
      </div>
    </div>
  );
}


export default Register;
