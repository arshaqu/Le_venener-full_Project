import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function Userslist() {
  // const history = useHistory()

  const [user,setUser] = useState([])
  const [users, setUsers] = useState([]);
  

    useEffect(()=>{
        try {
            const fetchData = async()=>{
                const response = await axios.post('/api/admin/userList',{},{
                  headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
                });
                setUser(response.data);
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    })


    const navigate = useNavigate()
    const handleclick = async (id, blocked) =>{
      
      try {
        
        
        
        const response = await axios.post("/api/admin/isblocked",{id,blocked},{
          headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") },
        })
        console.log(response.data);
        if( response.data.success){
          window.location.reload()
        }
    

     } catch (error) {
      console.error("Error blocking user:", error);
     }
    }


    const formatDateString = (dateString) => {
      const formattedDate = new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return formattedDate;
    };


  return (
     
    <div>
        <div>
        <div className='conta'>

      <AdminHeader/>
      <h1
  style={{
    textAlign: 'center',
    fontSize: '2.5rem',
    padding: '15px',
    background: '#AF2655',
    color: 'white',
    borderRadius: '10px',
    fontFamily: 'Lobster, cursive',
    marginTop: '100px',
    marginLeft: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s',
    cursor: 'pointer',
  }}
  className="hover:bg-blue-500 mr-5"
>
  User Listing
</h1>

        </div>

      <div className="relative overflow-x-auto  shadow-md m-5 sm:rounded-lg">
      <table style={{marginLeft:'400px'}} className="w-400 p-55 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
          <tr>
            <th scope="col" className="px-6 py-3">
              User name
            </th>
            <th scope="col" className="px-6 py-3">
              email Address
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
            Registered Date
            </th>
            <th scope="col" className="px-6 py-3">
            Block/Unblock
            </th>
           
        
           
          </tr>
        </thead>
        <tbody>
         {
          user && user.map((data)=>(
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.name}
              </th>
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{data.phone}</td>
              <td className="px-6 py-4">{formatDateString(data.createdAt)}</td>
              {/* <td className="px-6 py-4"> */}

                <td>
                <button
  onClick={() => handleclick(data?._id, data?.blocked)}
  style={{fontFamily:'initial',marginLeft:"35px"}}
  className={`w-20 h-8 rounded-lg font-bold  text-white ml-5 ${
    data?.blocked ? "bg-blue-500" : "bg-red-600"
  } hover:opacity-80 transition duration-300 ease-in-out`}
>
  {data?.blocked ? "Unblock  " : "Block"}
</button>
</td>
            
           
          </tr>

          ))
         }

    

          {/* Add more table rows here */}
        </tbody>
      </table>
    </div>



    </div>
    </div>
  )
}

export default Userslist
