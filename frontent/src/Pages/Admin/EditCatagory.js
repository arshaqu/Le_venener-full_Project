import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from './AdminHeader';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditCatagory() {
    const [catagory,setCatagory] = useState('')
    const [newCatagory , setNewcatagory] = useState('')
    const navigate = useNavigate();

    const { data } = useParams()

    const findCatagory = async()=>{
        const response = await axios.post('/api/admin/catagoryfind',{data},{
            headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
          });
          setCatagory(response.data.catdata);
    } 

     const onFinish = async ()=>{
        try {
            const response = await axios.post('/api/admin/catagoryupdate',{data,newCatagory},{
                headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
            })
            console.log(response);
            if(response.data.success){
                toast.success("Catagory successfully updated")
               
                navigate('/admin/catagorylist')
            }
        } catch (error) {
            
        }
     }

    useEffect(() => {
        findCatagory()
    }, [])
      
     
  return (
    <div>
     <AdminHeader/>
      <div style={{width:'600px',marginLeft:'410px' ,marginTop:'200px'}}  className=" mt-10 p-8 border border-gray-500 rounded-lg shadow hover:bg-gray-100  dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
        <form>
        <div className="grid grid-cols-2 gap-4 ">
            <div>
            <h3 style={{color:'#89B9AD'}} className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Enter Category</h3> 
            <div className='flex flex-column'>
         <input
              style={{width:'530px'}}
                type="text"
                name="catagory"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={catagory}
                onChange={(e)=>setNewcatagory(e.target.value)}
                required
                />
                <button onClick={onFinish} style={{width:'531px',color:'#89B9AD' }} type="button" className="mt-4  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/50 dark:shadow-lg dark:shadow-green-900/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update</button>
                </div>
            </div>
            </div>
        </form>
      </div>
        
    

    </div>
  )
}

export default EditCatagory
 