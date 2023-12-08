import React from 'react'
import { Navigate } from 'react-router-dom'


 function ProtectedRoute(props) {
    if (localStorage.getItem('admintoken')) {
      return props.children;
    } else {
      return <Navigate to='/admin/login' />;
    }
  }
  
  export default ProtectedRoute