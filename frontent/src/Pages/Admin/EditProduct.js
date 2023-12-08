import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditProduct() {
    const {data} = useParams()
    const navigate = useNavigate()
    const [values,setvalues] = useState([])
    console.log(values);
    

    const onFinish = async(e)=>{
     
        try {
            console.log("jojo");
            const response = await axios.post("/api/admin/editProduct",{data,values},{
                headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
              })
              console.log(response);
              if(response.data.success){
                toast.success("Product Updated Successfully")
                navigate('/admin/dashboard')
              }
        } catch (error) {
            console.log(error);
        }
    }


  return (
   <div>
      <AdminHeader />
      <div style={{marginLeft:'800px'}} className="p ">
        <p className="text-5xl font-extrabold pl-5 mt-40 leading-none text-green-800">Edit Product</p>
      </div>
      <div style={{width:'1000px',marginLeft:'480px'}}  className=" mt-10 w-96 p-8 bg-white border border-gray-500 rounded-lg shadow hover:bg-gray-500 hover:text-white dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
        <form  encType="multipart/form-data">
         
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
              onChange={(e)=>{

                setvalues({
                  ...values,
                  product:e.target.value})
                //   console.log(values)
              }
            }
            
                type="text"
                name="product"
                className="w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
                required
              />
            </div>
            <div>
              <input
              onChange={(e)=>{
                setvalues({
                  ...values,
                  color:e.target.value
                })
              }}
                type="text"
                name="color"
                className="w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Color"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
              onChange={(e)=>{setvalues({...values,size:e.target.value})}}
                type="text"
                name="size"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Size"
                required
              />
            </div>
            <div>
              <input
              onChange={(e)=>{setvalues({...values,price:e.target.value})}}
                type="text"
                name="prize"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
              onChange={(e)=>{setvalues({...values,modelnumber:e.target.value})}}
                type="text"
                name="model"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Model Number"
                required
              />
            </div>
            <div>
              <input
               onChange={(e)=>{setvalues({...values,quantity:e.target.value})}}
                type="text"
                name="quantity"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Quantity"
                required
              />
            </div>
          </div>
          <div className="mt-4">
          {/* <select
  className="form-control"
  onChange={(e) => {
    setvalues({ ...values, category: e.target.value });
  }}
  style={{ color: values.category ? 'gray' : 'green' }}
>
  <option value="" disabled selected hidden>
    Select Category
  </option>
  {category &&
    category.map((data) => (
      <option key={data.catagoryName} value={data.catagoryName}>
        {data.catagoryName}
      </option>
     ))}
</select> */}

          </div>
          <input
           onChange={(e)=>{setvalues({...values,description:e.target.value})}}
            type="text"
            name="description"
            className="w-full mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
          />
          <button
            className="mt-5 ml-80 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={onFinish}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
