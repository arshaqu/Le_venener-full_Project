import axios from 'axios'
import Headeer from  './Header'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Showorder() {
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await axios.post("/api/user/showorders", {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setOrder(response.data.orderData);
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetail = async (id)=>{
    navigate(`/orderDetails/${id}`)
  }

  useEffect(() => {
    getDetails();
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-IN', options);
    return formattedDate;
  }
  const cancelOrder = async (orderId) => {
    console.log(orderId);
    const response = await axios.post("/api/user/cancelorder", { orderId }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    console.log(response);
    window.location.reload();
  };
    

   // Calculate total number of pages
   const totalPages = Math.ceil(order.length / itemsPerPage);
   // Calculate the index of the last item on the current page
   const indexOfLastItem = currentPage * itemsPerPage;
   // Calculate the index of the first item on the current page
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   // Get the current items to display on the page
   const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
        <Headeer/>
          <h1
    style={{
      textAlign: 'center',
      fontSize: '2rem',
      padding: '10px',
      backgroundColor: '#96C291',
      fontWeight:'bold',
      color: 'white',
      borderRadius: '8px',
      fontFamily:'cursive',
      margin:'10px ',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
    }}
    className="hover:bg-blue-500 mt-3"
  >
    Show Orders Details
  </h1>      

      <table class="  ml-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Event Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Product Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Rent Days
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Product Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Total Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Catagory
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Payment_id
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Payment
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Delivery Address
                  </th>
                  <th scope="col" class="px-6 py-3">
                       Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                       Action
                  </th>
                  <th scope="col" class="px-6 py-3">
                       View
                  </th>
              </tr>
          </thead>
          <tbody>
    {currentItems.map((order) => (
      // products.map((product) => (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {formatDate(order.products[0].eventDate)}
          </th>
          <td className="px-6 py-4">
            {order.products[0].productName}
          </td>
          <td className="px-6 py-4">
            {order.products[0].eventPeriod}
          </td>
          <td className="px-6 py-4">
          ₹ {order.products[0].productPrice}
          </td>
          <td className="px-6 py-4">
          ₹ {order.totalAmount}
          </td>
          <td className="px-6 py-4">
    {order.status ? 'Success' : 'False'}
  </td>
          <td className="px-6 py-4">
          {order.products[0].productCatagory}
          </td>
          <td className="px-6 py-4">
        {order.paymentId}
          </td>
          <td className="px-6 py-4">
        {order.deliveryAddress}
          </td>
          
          <td className="px-6 py-4">
        {order.history}
          </td>
         
            
          <td className="px-6 py-4">
                {order.history === 'Pending' ? (
                  <button onClick={() => cancelOrder(order._id)} className="bg-red-500 mt-3 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                ) : (
                  <span className="text-green-500">Order Cancelled</span>
                )}
              </td>
              <td className="px-6 py-4">
              <button onClick={() => viewDetail(order._id)} className="bg-green-500 mt-3 mr-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Detail
                  </button>
          </td>

        </tr>
      // ))
    ))}
  </tbody>
      </table>
       {/* Pagination buttons */}
       <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
</div>

  )
    }
  

export default Showorder