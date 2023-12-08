import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Vortex } from "react-loader-spinner";
import Login from "./Pages/Users/Login";
import Register from "./Pages/Users/Register";
import Home from "./Pages/Users/Home";
import Forget from "./Pages/Users/Forget_pass";
import Outfitlist from "./Pages/Users/Outfitlist";
import Userslist from "./Pages/Admin/Userslist";
import Outfitdetails from "./Pages/Users/Outfitdetails";
import ResetPassword from "./Pages/Users/ResetPassword";
import Checkout from "./Pages/Users/Checkouts";
import Profile from './Pages/Users/Profile'

import AdminLogin from "./Pages/Admin/adminLogin";
import Addproduct from "./Pages/Admin/productAdd";
import AddCatagory from "./Pages/Admin/AddCatagory";
import CatagoryList from "./Pages/Admin/CatagoryList";
import ProductList from "./Pages/Admin/ProductList";
import Cart from "./Pages/Users/Cart";
import AddresDetails from "./Pages/Users/AddresDetails";
import Showorder from "./Pages/Users/Showorder";


import "./Pages/Admin/adminLogin.css";
import "./Pages/Users/Otp.css";
import "./Pages/Users/Forget_pass.css";
import "./Pages/Users/ResetPassword.css";
import Dashboard from "./Pages/Admin/Dashboard";
import Otp from "./Pages/Users/Otp";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoutes from "./components/PublicRoutes";
import AdminShoworders from "./Pages/Admin/AdminShoworders";
import EditProfile from "./Pages/Users/EditProfile";
import EditEmail from "./Pages/Users/EditEmail";
import EmailOtp from "./Pages/Users/EmailOtp";
import EditCatagory from "./Pages/Admin/EditCatagory";
import EditProduct from "./Pages/Admin/EditProduct";
import Address from "./Pages/Users/Address";
import ErrorPage from "./Pages/Users/ErrorPage";
import Chat from "./Pages/Users/Chat";
import AdminChat from "./Pages/Admin/AdminChat";
import Notification from "./Pages/Users/Notification";
import OrderDetails from "./Pages/Users/OrderDetail";
import OutfitlistGroom from "./Pages/Users/OutfitlistGroom";


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App ">
      <BrowserRouter>
        {loading && (
          <div className="spinner-loading">
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
                      {/* Users */}
          <Route path="/" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/forget" element={<PublicRoutes><Forget /></PublicRoutes>} />
          <Route path="password_change" element={<ResetPassword />} />
          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path="/otp" element={<PublicRoutes><Otp/></PublicRoutes>} />
          <Route path="/home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path="/outfit" element={<ProtectedRoutes><Outfitlist /></ProtectedRoutes>} />
          <Route path="/outfitGroom" element={<ProtectedRoutes><OutfitlistGroom/></ProtectedRoutes>} />
          <Route path="/details/:id" element={<ProtectedRoutes><Outfitdetails /></ProtectedRoutes>} />
          <Route path="/cart" element={<ProtectedRoutes><Cart/></ProtectedRoutes>} />
          <Route path="/address" element={<ProtectedRoutes><AddresDetails/></ProtectedRoutes>} />
          <Route path="/checkout-payment/:id" element={<ProtectedRoutes><Checkout/></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />
          <Route path="/showOrders" element={<ProtectedRoutes><Showorder/></ProtectedRoutes>} />
          <Route path="/editProfile" element={<ProtectedRoutes><EditProfile/></ProtectedRoutes>} />
          <Route path="/editEmail" element={<ProtectedRoutes><EditEmail/></ProtectedRoutes>} />
          <Route path="/emailOtp/:value" element={<ProtectedRoutes><EmailOtp/></ProtectedRoutes>} />
          <Route path="/addressing" element={<ProtectedRoutes><Address/></ProtectedRoutes>} />
          <Route path="/chat" element={<ProtectedRoutes><Chat/></ProtectedRoutes>} />
          <Route path="/notification" element={<ProtectedRoutes><Notification/></ProtectedRoutes>} />
          <Route path="/orderDetails/:id" element={<ProtectedRoutes><OrderDetails/></ProtectedRoutes>} />
          <Route path="/*" element={<ErrorPage/>} />






                            {/* Admin */}
        
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/admin/productAdd" element={<ProtectedRoute><Addproduct/></ProtectedRoute>} />
          <Route path="/admin/addcatagory" element={<ProtectedRoute><AddCatagory/></ProtectedRoute>} />
          <Route path="/admin/catagorylist" element={<ProtectedRoute><CatagoryList /></ProtectedRoute>} />
          <Route path="/admin/productList" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/admin/userlist" element={<ProtectedRoute><Userslist/></ProtectedRoute>} />
          <Route path="/admin/showorder" element={<ProtectedRoute><AdminShoworders/></ProtectedRoute>} />
          <Route path="/admin/editCatagory/:data" element={<ProtectedRoute><EditCatagory/></ProtectedRoute>} />
          <Route path="/admin/editProduct/:data" element={<ProtectedRoute><EditProduct/></ProtectedRoute>} />
          <Route path="/admin/chat" element={<ProtectedRoute><AdminChat/></ProtectedRoute>} />




          
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
