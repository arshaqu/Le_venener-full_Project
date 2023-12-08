import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import toast from 'react-hot-toast'

function EditProfile() {
   const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = {
        name : '',
        email:'',
        phone:'',
        alternative:'',
        post:'',
        city:'',
        area:'',
        address:''
    }
    const [values,setvalues] = useState (initialValues)
    // const [orderId ,setOrderId] = useState('')
    const [address,setAddress] = useState('')
    // console.log("orderid",orderId);
  

        const GetData = async(req,res)=>{
          try {
            const response1 =await axios.post("/api/user/getProfile", { }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') },
              });
              setAddress(response1.data.addressData[0]);
          } catch (error) {
            console.log(error);
          }
        }    
 
    const onFinish = async()=>{
      try {
        dispatch(showLoading())
        const response = await axios.post("/api/user/address", { values }, {
            headers: { Authorization: "Bearer " + localStorage.getItem('token') },
          });
          

          // setOrderId();
          dispatch(hideLoading())
          setvalues(initialValues)
          navigate('/profile')
          if(toast.data.success){
            toast.success("Address Updated ")
          }
          else{
            toast.error("Address not Added Please Fil the Blanks")
          }
        } catch (error) {
          dispatch(hideLoading())

          console.log(error);
        }
      }

      useEffect(()=>{
        GetData()
      },[])


  return (
<div>
    <Header/>
 
      <div style={{marginLeft:'100px'}} className="p ">
        <h2 style={{fontFamily:'sans-serif' ,color:'#86A789'}} className="text-center mt-4 mr-40">EDIT ADDRESS DETAILS</h2>
      </div>
      <div style={{width:'1000px',marginLeft:'320px'}}  className="  mt-10 w-96 p-8 bg-white border align-center border-gray-500  rounded-lg shadow hover:bg-gray-500 hover:text-white dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
        <form >
          <div style={{width:'935px'}} className="mb-4">
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                    onChange={(e)=>{setvalues({  ...values,name:e.target.value})}}
                type="text"
                name="name"
                className="w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={address?.userName}
                required
              />
            </div>
            <div>
              <input
              onChange={(e)=>{
                setvalues({  ...values,email:e.target.value})}}
                type="text"
                name="email"
                className="w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="S/O"
                // value={{}}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
              onChange={(e)=>{setvalues({  ...values,phone:e.target.value})}}
                type="text"
                name="phone"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder= {address?.mobile}
                required
              />
            </div>
            <div>
              <input
              onChange={(e)=>{setvalues({  ...values,alternative:e.target.value})}}
                type="text"
                name="alternative"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={address?.alternativeNumber}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
              onChange={(e)=>{setvalues({  ...values,post:e.target.value})}}
                type="text"
                name="post"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={address?.pincode}
                required
              />
            </div>
            <div>
              <input
               onChange={(e)=>{setvalues({  ...values,area:e.target.value})}}
                type="text"
                name="area"
                className="w-full text-sm  text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={address?.area}
                required
              />
            </div>
          </div>
          
          <div>
              <input
               onChange={(e)=>{setvalues({  ...values,city:e.target.value})}}
               id="countries" type='text'  required name='city'
               
                className="w-full text-sm mt-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={address?.city}
            
              />
            </div>
          

          <input
           onChange={(e)=>{setvalues({  ...values,address:e.target.value})}}
            type="text"
            name="address"
            className="w-full mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={address?.address}
            required
          />
          <button
          type='button'
            className="mt-5 ml-80 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={onFinish}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )};
  


export default EditProfile
