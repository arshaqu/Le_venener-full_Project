import React, { useEffect, useState } from 'react'
import image1 from '../../assets/man.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { RiWallet3Fill } from "react-icons/ri";



function Profile() {
    const navigate = useNavigate()
    const [details ,setDetails ] = useState('')
    const [user ,setUsers ] = useState('')
    const [email ,SetEmail ] = useState('')




    console.log(details);
    
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
          
            



    return (
      <div>
        <Header/>
        <div className='flex'>
        <div style={{width:'600px',marginLeft:'350px', fontFamily:'cursive', fontWeight:'' }} className='ml-5 mt-20 p-6 bg-gradient-to-r from-green-300 to-blue-500 text-white rounded-lg shadow-md '>

{details ? (
            

            <div style={{width:'100px',alignItems:'center'}} className=" justify-end ">
            <img src={image1}
            style={{alignItems:'center'}} 
            className='ml-2'
            />
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



    <button onClick={navigation} style={{marginLeft:'350px',height:'40px',fontWeight:'bld'}} type="button" className="text-white bg-pink-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none ">Edit</button>
    </div>
    </div>
      




    ) : (
    
        


        <div>
          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '20px',color:'#green' }} className='color-green-500'>Address are empty Please Enter Your Address</p>
          <button className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none ' onClick={onclicked  }>Add Address</button>
        </div>
        
       
           
              
            )}
        
  
</div>

<div style={{ height: '150px',marginTop:'300px',fontFamily:'cursive' }} className="ml-5 mt-20 flex bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white p-5 border border-blue-600 rounded-lg shadow-lg">
  <div className="w-1/2 flex">
<div>
  < RiWallet3Fill className='w-full mt-2' style={{width:'30px'}} />
  
  </div>
      <h6 style={{marginTop:'2px', }} className="ml-2 text-xl font-bold">Wallet</h6>
  </div>
  <div className="w-1/2 flex items-center justify-center">
    <h5 className="text-3xl ml-4 font-bold"> ₹{user.wallet}/-</h5>
  </div>
</div>



</div>
</div>



 
 
 
    )
  
}

export default Profile
