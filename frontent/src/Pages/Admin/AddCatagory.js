import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Footer } from 'antd/es/layout/layout'


function AddCatagory() {

        const [catagory,setCaragory] = useState('')
        const navigate = useNavigate();

        const onFinish = async ()=>{
            // console.log(catagory);
            try {
                const response = await axios.post('/api/admin/addCatagory',{catagory},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
        }
                )
                if(response.data.sucess){
                    toast.success(response.data.message)
                    navigate('/admin/catagorylist')
                }
                else{
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Something gooose wrong")
            }                    
        }





    return (
        <div>
                <AdminHeader />

            <div style={{ marginLeft: "600px", marginTop: "110px" }} className=' '>
                <p style={{ fontSize: '80 px', color: 'green' }} className=' text-4xl font-extrabold leading-none tracking-tight
                  text-gray-900 md:text-4xl lg:text-5xl'> Add Catagory </p>
            </div>
            <div style={{ marginLeft: '490px', height: '20 0px', marginTop: '-25px', width: '650px' }} className='block max-w-200 mr-7  px-8 p-6 bg-white border h-220 border-gray-500 
            rounded-lg shadow hover:bg-gray-500 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800'>
                <form >


                    <div style={{ width: '100px' }} className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <input style={{ width: '600px', marginLeft: '-10px' }} type="text" name='catagoryNam' id="first_name" className="shadow-md mt-4 bg-gray-50 border border-gray-300 text-gray-900 mt-1 text-sm
                 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                placeholder="catagory......" required onChange={(e)=> setCaragory(e.target.value)}  />
                        </div>

                    </div>

                    <button type="button" className=" ml-50 focus:outline-none text-white ml-60
                bg-purple-700 mt-2 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
                dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={onFinish}>Submit</button>
                </form>
                <div>

                </div>

            </div>
            <Footer/>
        </div>

    )
}

export default AddCatagory
