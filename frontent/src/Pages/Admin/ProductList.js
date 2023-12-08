import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [product,setProduct] = useState([]);
  const navigate = useNavigate();


  useEffect (()=>{
    try {
      
      const fetchdata = async()=>{
        const response = await axios.post("/api/admin/productList",{},{
          headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
        }
         );
        setProduct(response.data);
      }
      fetchdata()
    } catch (error) {
      console.log(error.message);
    }
  })

  const handledelete = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("/api/admin/deleteProduct",{data},{
        headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
      }
       )
       if(response.data.success){
        toast.success("product delete Successfully")
        window.location.reload()
       }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async(data) =>{
    console.log("heee");
    navigate(`/admin/editProduct/${data._id}`)
  }



  return (
    <div>
        <div className='conta'>
      <AdminHeader/>
     
        </div>

      <div className="relative overflow-x-auto p-6 shadow-md m-5 sm:rounded-lg">
      <table style={{marginLeft:'300px',marginTop:'100px'}} className="w-400 p-55 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Desciption
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
         {
          product && product.map((data)=>(
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.product}
              </th>
              <td className="px-6 py-4">{data.color}</td>
              <td className="px-6 py-4">{data.catagory}</td>
              <td className="px-6 py-4">{data.price}</td>
              <td className="px-6 py-4">{data.stock}</td>
              <td className="px-6 py-4">{data.model}</td>
              <td className="px-6 py-4">{data.size}</td>
              <td className="px-6 py-4">{data.description}</td>
              <td className="ere">
                              <button href="#" onClick={()=>{handleEdit(data)}}  className="font-medium ml-5 text-green-600 dark:text-blue-500 ">Edit</button>
                          </td>
                          <td className="ere">
                              <button href="#" onClick={()=>{handledelete(data)}} className="font-medium ml-5 text-red-600 dark:text-red-500 ">Delete</button>
                          </td>

            {/* <td className="px-6 py-4">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                Edit
              </a>
            </td> */}
          </tr>

          ))
         }

    

          {/* Add more table rows here */}
        </tbody>
      </table>
    </div>



    </div>
  )
}

export default ProductList
