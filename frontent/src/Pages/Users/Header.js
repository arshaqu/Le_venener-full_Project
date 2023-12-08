import React, { useEffect, useState } from "react";
import "./Header.css";
import logoi from "../../assets/le venner.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState({ name: "" }); 
  const navigate = useNavigate()
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }



  const [block ,setBlock] =useState('')
  console.log(block);
const fetchData = async () => {
  try {
   const response = await axios.post("/api/user/lookisblocked", { }, {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') },
  });
  setBlock(response.data.blocked)
  
  }catch (error){
      console.log(error);
  }
};


// Function to handle logout
const handleout = () => {
  localStorage.removeItem("token");
  navigate('/');
};

useEffect(() => {
  if (block === true) {
    handleout(); // Call the logout function
  }
}, [block]);


  
  useEffect(() => {
    getData();
    fetchData();
  }, []); 
  
  
     const handleLogout = () =>{
      localStorage.removeItem('token')

      navigate('/')
     }
  
  
  
  return (
    <div class="">
      <div className="h-20  flex">
        <img className=" " src={logoi} />
        <h1 className="levenner_tag mt-2">Le Venner</h1>
        
        <div
          style={{ textAlign: "center", marginLeft: "50px " }}
          className="hidden texts w-full md:block md:w-auto"
          id="navbar-solid-bg"
        >
          
          <ul style={{marginLeft:'-100px'}} className="flex flex-col font-medium mt-4  bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="/home"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/outfit"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                Outfits
              </a>
            </li>
          
            <li>
              <a
                href="/Cart"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                Cart
              </a>
            </li>

            <li>
              <a
                href="/chat"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                chats
              </a>
            </li>


            <li>
              <a
                href="/showOrders"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                Your Orders
              </a>
            </li>


            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                  About Us 
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={handleLogout}
                className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
                Logout
              </a>
            </li>


            <li>

            <div className="flex">
            <a
                href="#"
                className="block ml-5 py-2 pl-3 pr-4 text-gray-900 text-bold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" }}
              >
              Name : 
              </a>
              <a
                href="/profile"
                className="block ml-1 py-2 pl-3 pr-4 text-gray-900 text-bold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar"
                style={{ textDecoration: "none" , fontWeight:'bold'}}
              >
              {user.name !== "" ? user.name.toUpperCase() : "Loading..."}
              </a>
            </div>
            </li>

         


          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
