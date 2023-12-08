import React, { useEffect, useState } from 'react'
import image1 from '../../assets/man.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { RiWallet3Fill } from "react-icons/ri";
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'


function Address() {

    const navigate = useNavigate()
    const [details ,setDetails ] = useState('')
    const [user ,setUsers ] = useState('')
    const [email ,SetEmail ] = useState('')
    

    console.log(details);
    
    const dispatch = useDispatch()
      const getDetails = async() => {

        try {

            const response = await axios.post("/api/user/profileDetails",{},
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
            // console.log(response.data.addressData);
            setDetails(response.data.addressData[0])
            setUsers(response.data.userData[0]);   
            SetEmail(response.data.userData[0].email);         


        } catch (error) {
            console.log(error);
        }     
          
    }
          useEffect(()=>{
              getDetails();
              // walletDetails();
            },[])

            const onclicked =async () =>{
              navigate('/editProfile')
              
            }


            function navigation(){
              navigate('/editProfile')
            }

            const EditEmail = async (req,res)=>{
              navigate('/editEmail')
            }
          

            const onFinish = async()=>{
                try {
                  dispatch(showLoading())
                 
                    const response1 = await axios.post("/api/user/order", {}, {
                      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                    });
                    console.log("response1",response1.data.orderData._id);
          
                    // setOrderId();
                    dispatch(hideLoading())
                    navigate(`/checkout-payment/${response1.data.orderData._id}`)
                    if(toast.data.success){
                      toast.success("Address Added Successfully")
                    }
                    else{
                      toast.error("Address not Added Please Fil the Blanks")
                    }
                  } catch (error) {
                    dispatch(hideLoading())
          
                    console.log(error);
                  }
                }
            

  return (
    <div>
       <div>
        <Header/>
        <div className='flex addressng'>
        <div style={{width:'600px',marginLeft:'350px', fontFamily:'cursive', fontWeight:'' }} className='ml-5 mt-20 p-6 bg-gray-100  text-black rounded-lg shadow-md '>

{details ? (
            

            <div style={{whiteSpace:'nowrap'}} className=" justify-end ">
            <h1 style={{width:'100%'}}>DeliVery Address</h1>
          <div className="flex mt-2">
      <div className="flex items-center ml-5">
        <p className="mt-5 mr-2">Name:</p>
      </div>
      <div className="flex items-center">
      <p style={{fontWeight:'200px'}} className="mt-5 ml-5">{details.userName?.toUpperCase()}</p>  </div>
    </div>
    
    
    <div className="flex">
  <div className="flex ml-5">
    <p className="">Email:</p>
  </div>
  <div className="flex items-center">
    <p className='ml-5' style={{ fontWeight: '200', whiteSpace: 'nowrap', }}>{email}</p>
    <button onClick={EditEmail} style={{ marginLeft: '200px', color: 'blue' }} className='mb-3'>EditEmail</button>
  </div>
</div>
    
    
    
    <div className="flex">
      <div className="flex ml-5">
        <p className="">PhoneNumber:</p>
      </div>
      <div className="flex items-center">
        <p className='ml-3' style={{ fontWeight: '200', whiteSpace: 'nowrap',}}>{details?.mobile}</p>
      </div>
           
    
    </div>
           <div className="flex">
      <div className="flex ml-5">
        <p className="">AlternativeNumber:</p>
      </div>
      <div className="flex items-center">
        <p className='ml-3' style={{ fontWeight: '200', whiteSpace: 'nowrap',}}>{details?.alternativeNumber}</p>
      </div>
    </div>
    
    <div className="flex">
      <div className="flex ml-5">
        <p className="">Place:</p>
      </div>
      <div className="flex items-center">
        <p className='ml-5' style={{ fontWeight: '200', whiteSpace: 'nowrap',}}>{details.area?.toUpperCase()}</p>
      </div>
    </div>
    
    
    <div className="flex">
      <div className="flex ml-5">
        <p className=" ">City:</p>
      </div>
      <div className="flex items-center">
        <p className='ml-5' style={{ fontWeight: '200', whiteSpace: 'nowrap',}}>{details.city?.toUpperCase()}</p>
      </div>
    </div>
    
    <div className="flex">
      <div className="flex ml-5">
        <p className="">Address:</p>
      </div>
      <div className="flex items-center">
        <p className='ml-4' style={{ fontWeight: '200', whiteSpace: 'nowrap',}}>{details?.address}</p>
      </div>
    </div>
   
    <div className=''>


    <button onClick={navigation} style={{marginLeft:'30px',height:'40px',fontWeight:'bld'}} type="button" className="text-white bg-pink-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none ">Edit</button>
    <button onClick={onFinish} style={{marginLeft:'200px',height:'40px',fontWeight:'bld'}} type="button" className="text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none ">Submit</button>

    </div>
    </div>
      




    ) : (
    
        


        <div>
          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '20px',color:'#green' }} className='color-green-500'>Address are empty Please Enter Your Address</p>
          <button className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none ' onClick={onclicked  }>Add Address</button>
        </div>
        
       
           
              
            )}
        
  
</div>




</div>
</div>
    </div>
  )
}

export default Address
