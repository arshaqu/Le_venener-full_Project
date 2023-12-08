import React from 'react'
import { Button, Input, Form } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';




function EmailOtp() {
    const navigate = useNavigate(); 
    const value = useParams();
    console.log(value);

    const onFinish = async (values) => {
        console.log(values)
        //  values.email=emails
        console.log(values)
        try {
          const response = await axios.post("/api/user/emailOtpVerification", {values,value},
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
         
    
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/home");
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
    <div>
      <div className='Authentication bgm-img'>
      <div className='otp-form inner_boxer'>
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
          <Form.Item  name="email">
            {/* <Input className='sizing' values={email}  type='hidden' size="large" placeholder="" />  */}

           </Form.Item>
         
        </Form>
      </div>
    </div>
    </div>
  )
}

export default EmailOtp
