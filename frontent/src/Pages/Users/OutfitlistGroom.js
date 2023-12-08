import React, { useEffect, useState } from 'react'
import axios  from'axios'
import { useNavigate } from 'react-router-dom'
import logoi from '../../assets/le venner.png';
import { hideLoading,showLoading } from '../../redux/alertsSlice.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import './Home.css';

function OutfitlistGroom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search,setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterByName = (e) => {
    const selectedName = e.target.value;
    const filteredProducts = product.filter((item) =>
      selectedName === 'All' ? true : item.product === selectedName
    );
    setFilter(filteredProducts);
  };
  

  
  

  const handleSortprice = () => {
    const sortedProducts = [...filter].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilter(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) =>{
    const searchTerm =e.target.value
    setSearch(searchTerm);
    if(searchTerm === ''){
      setFilter(product)
    }
    else{
      const filteredResult = product.filter((item)=>item.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setFilter(filteredResult);
    }
  }


  const getproduct = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/outfitGroom', {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') },
      });
      dispatch(hideLoading());
      console.log(response.data);
      setProduct(response.data.product);
      setFilter(response.data.product);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  const handleImageClick = (productId) => {
    navigate(`/details/${productId}`);
  };

  return (
    <div>
       <div style={{backgroundColor:'#F5EEC8'}} className='h-20 m-2 flex'>
        <img 
        className='m-0'
          src={logoi}
        />
       <h1 className='levenner_tag mt-2'> 
        Le Venner
       </h1>
  
       <div style={{textAlign:'center' ,marginLeft:'0px ' }} className="hidden texts w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4  bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
       
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Home</a>
        </li>
        <li>
          <a href="/outfits" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Outfits</a>
        </li>
        <li>
          <a href="/cart" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Cart</a>
        </li>
        <li>
          <a href="/showOrders" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Your Orders</a>
        </li>
        <li>
          <a href="/cart" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Cart</a>
        </li>
        <li>
          <a href="/Profile" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>Profile</a>
        </li>
        <li>
          <a href="/profile" className="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dar" style={{textDecoration:"none"}}>About Us</a>
        </li>
      </ul>
    </div>

  </div>
      <div className='flex w-full justify-center' style={{ marginTop: "50px" }}>
      <form className='searching' >
    <div className='searching3  '>
<label  htmlFor="default-search" className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">
  Search
</label>
</div>
<div className="relative">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  </div>
  <input style={{height:'15px',width:"500px" }}
    type="search"
    id="default-search"
    className="searching1 block w-full mt-2 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Search Mockups, Logos..."
    value={search}
    onChange={handleSearch}
    required
  />
   
</div>
</form>
      </div>
      <div>
        <div className=''>
          <div>
            <p style={{ marginLeft: '100px', fontWeight: 'bold' }}>Filter</p>
            <select
              className="mb-2 ml-2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              value={sortOrder}
              onChange={handleSortprice}
            >
              <option value="asc">Price High to Low</option>
              <option value="desc">Price Low to High</option>
            </select>
          </div>
          <div>
          <select
  className="mb-2 ml-2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  value={sortOrder}
  onChange={(e) => {
    setSortOrder(e.target.value);
    handleFilterByName(e); // Pass the event object to the function
  }}
>
  <option value="asc">Filter Names Assenting</option>
  <option value="desc">Name in Descenting</option>
</select>

          </div>
          <div className='container flex flex-wrap pt-3 ml-15 p-1 justify-center'>
            {filter?.map((products, index) => (
              <div key={index} className="ml-12 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {products && products.image && products.image[0] && (
                  <img style={{ width: '280px', height: '350px' }} className="rounded-t-lg h-30" onClick={() => handleImageClick(products._id)} alt="" src={`http://localhost:5000/product/${products.image[0]}`} />
                )}
                <div className="p-5">
                  <h4 style={{ fontFamily: '-moz-initial' }} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{products?.product}</h4>
                  <p style={{ color: 'green', fontFamily: 'initial', fontWeight: 'bold' }}>₹ {products?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutfitlistGroom;
