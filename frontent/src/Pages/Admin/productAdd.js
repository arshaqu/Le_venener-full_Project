import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ProductAdd() {

  const [catagory,setCatagory] = useState([]);

 

  const fetchCatagory = async()=>{
    try {
      const response = await axios.post("/api/admin/listCategory",{},{
        headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
      }
       );
       console.log("---------",response);
      setCatagory(response.data);
    
    
  } catch (error) {
    console.log(error.message);
  }
  }

  const initialValues = {
    description: '',
    catagory: '',
    quantity: '', 
    modelnumber: '',
    price: '',
    size: '',
    color: '',
    product: '',
    image:[]
  };
  console.log(initialValues);

  const[values,setvalues]=useState(initialValues);
  const navigate = useNavigate();

    const onFinish = async (e)=>{
      console.log(values.catagory);
      e.preventDefault()
      const formdata = new FormData();
      for (let i = 0; i < values.image.length; i++) {
        formdata.append('image', values.image[i]);
      }
      formdata.append('description',values.description)
      formdata.append('catagory',values.catagory)
      formdata.append('quantity',values.quantity)
      formdata.append('modelnumber',values.modelnumber)
      formdata.append('price',values.price)
      formdata.append('size',values.size)
      formdata.append('color',values.color)
      formdata.append('product',values.product)

      console.log(formdata)
     
        try {
          const response = await axios.post('/api/admin/productAdd', formdata);
            setvalues(initialValues)
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
                toast("Redirecting to Product List")
                navigate('/admin/productList')
            }
        } catch (error) {
            console.log(error)
            console.error(error.response); 
            toast.error("something was wrong.")
        }
    }

    
        useEffect(()=>{
          fetchCatagory()
       },[])





return (
    <div>
      <AdminHeader />
      <div style={{marginLeft:'800px'}} className="p ">
        <p className="text-5xl font-extrabold pl-5 mt-40 leading-none text-green-800">Add Product</p>
      </div>
      <div style={{width:'1000px',marginLeft:'380px'}}  className=" mt-10 w-96 p-8 bg-white border border-gray-500 rounded-lg shadow hover:bg-gray-500 hover:text-white dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
        <form  encType="multipart/form-data">
          <div style={{width:'935px'}} className="mb-4">
            <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900">
              Upload file
            </label>
            <input
              id="file_input"
              type="file"
              name="image"
              className="form-control w-full text-sm text-gray-900 border border-gray-600 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-600 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900 shadow-md"
              aria-describedby="file_input_help"
              multiple
              onChange={(e) => {
                setvalues({
                  ...values,
                  image:e.target.files})
                  console.log(values)
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
              onChange={(e)=>{

                setvalues({
                  ...values,
                  product:e.target.value})
                  console.log(values)
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
             <select className="form-control"
  onChange={(e) => {
    setvalues({ ...values, catagory: e.target.value });
  }}
  style={{ color: values.catagory ? 'gray' : 'green' }}
>
  <option value="" disabled selected hidden>
    Select Category
  </option>
  {catagory &&
    catagory.map((data) => (
      <option key={data.catagoryName} value={data.catagoryName}>
        {data.catagoryName}
      </option>
    ))}
</select>

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
  );
}

export default ProductAdd
