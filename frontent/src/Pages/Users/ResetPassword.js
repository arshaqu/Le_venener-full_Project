import React from 'react';
import './Forget_pass.css';
import {  FaEnvelope, FaKey } from 'react-icons/fa';
import { FaAmilia } from 'react-icons/fa';
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
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

function see() {
  const inputElement = document.getElementById('saw');
  if (inputElement) {
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
    } else {
      inputElement.type = 'password';
    }
  }
}

function Forget() {
  const searchParams = new URLSearchParams(document.location.search)
  const queryValue = searchParams.get('token');
  const navigate = useNavigate();
  const onFinish=async(values)=>{
    try {
      const formdata = new FormData();
      formdata.append('values',values.password1);
      formdata.append('values2',values.password2);
      formdata.append('queryValue',queryValue);

      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await axios.post('/api/user/password_change',formdata,config)
      if(response.data.success){
         toast("Password Change Successfully")
         localStorage.setItem('token',response.data.data)
         navigate('/login')
      }else{
         toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Wrong...") 
    }
  }
  return (
    <div className='Authentication reset_bgm img'>
      <div className='Forget-form inner_box'>
        <h1 className='reset_text'>Reset Password</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='content'>
            <div className='combo'>
              <FaEnvelope className='usersicon icons' />
              <Form.Item
                name='password1'
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
          <div className='content'>
            <div className='combo'>
              <FaKey className='usersicon icons' />
              <Form.Item
                name='password2'
                className='userCharacter'
                label='Re Enter Password'
                type='text'
              >
                <div className='contend'>
                <div>
                <Input
                  className=' inputB'
                  placeholder='ReEnter your Password'
                  type='password'
                  id='saw'
                  />
                </div>
                <FaAmilia/>
                  <div className='eye' onClick={see}>
                  <AiFillEyeInvisible/>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='btn'>
              Change The Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}


export default Forget;
