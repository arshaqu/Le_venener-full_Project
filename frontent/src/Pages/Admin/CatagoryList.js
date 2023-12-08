import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { message } from 'antd';

function CatagoryList() {
  const [category,setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    try {
      const fetchdata = async()=>{
        const response = await axios.post("/api/admin/listCategory",{},{
          headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
        }
         );
        setCategory(response.data);
      }
      fetchdata()
    } catch (error) {
      console.log(error.message);
    }
  },[])
  console.log(category)


  const hangleEdit = async(data)=>{
    try {
      console.log(data._id);
      navigate(`/admin/editCatagory/${data._id}`)
    } catch (error) {
      console.log(error);
    }
  }


  const handledelete = async(data) =>{
    try {
      const response = await axios.post("/api/admin/catdelete",{data},{
        headers: { Authorization: "Bearer " + localStorage.getItem("admintoken")}
      })
      if(response.data.success){
        toast.success("Catagory Deleted")
        window.location.reload();
      }
      console.log(response.data);
    } catch (error) {
      
    }
  }




  return (
    <div>
      <div>
      <AdminHeader/>
      </div>
        <div >
          <div style={{marginLeft:'550px',width:'400px', marginTop:'127px'}}  class="relative overflow-x-auto p-5 shadow-md sm:rounded-lg">
              <table className=" text-sm p-5 text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs p-5 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6  py-3">
                              Category Name
                          </th>
                         
                          <th  scope="col" className="px-6 py-3">
                              Edit
                          </th>
                          <th  scope="col" className="px-6 py-3">
                              Delete
                          </th>
                      
                      </tr>
                  </thead>
                  <tbody>
                      {
                        category && category.map((data) => (
                          <tr className=" bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {data.catagoryName}
                          </th>
                         
                        
                          <td className="ere">
                              <button href="#" onClick={()=>hangleEdit(data)} className="font-medium ml-5 text-green-600 dark:text-blue-500 ">Edit</button>
                          </td>
                          <td className="ere">
                              <button href="#" onClick={()=>handledelete(data)} className="font-medium ml-5 text-red-600 dark:text-red-500 ">Delete</button>
                          </td>
                      </tr>
                        ))
                      }
                </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default CatagoryList
