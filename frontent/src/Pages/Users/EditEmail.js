import React from 'react'
import { Button, Input, Form } from 'antd';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function EditEmail() {
    const navigate = useNavigate()



    const onFinish = async (value) => {
        console.log(value)
        try {
          const response = await axios.post("/api/user/changeEmail", {value},
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
         
          if (response.data.success) {
            toast.success(response.data.message);
            navigate(`/emailOtp/${value.email}`);
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
    <div>
      <div  className='Authentication bgf-img1'>
      <div className='otp-form inner_boxeril'>
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className='Forget'>New Email</h1>
          <p className='texters'>Enter Your Email To Verify Your Email</p>
          <Form.Item rules={emailrule} name="email">
            <Input className='sizingz' type='email' size="large" placeholder="Enter Your Email here..." />

          </Form.Item>
          <Form.Item>
            <Button className='submitbtn'  type="primary" danger htmlType='submit'>
              Change Email
            </Button>
          </Form.Item>
        
         
        </Form>
      </div>
    </div>
    </div>
  )
}

export default EditEmail
