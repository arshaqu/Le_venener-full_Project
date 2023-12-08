// // import { Header } from 'antd/es/layout/layout'
// import React, { useEffect } from 'react'
// import { onMessageListener, requestPermission } from '../../firebase'
// import {Toaster , toast} from 'react-hot-toast'

// function Notification() {

//   const [notification,setNotification] =useEffect({ title:"",body:""})

//   useEffect(()=>{
//     requestPermission()

//     const unsubscribe = onMessageListener().then(payload =>{
//       setNotification({
//         title:payload?.notification?.title,
//         body: payload?.notification?.body
//       });
//     })
//     return ()=>(
//       unsubscribe.catch(err=>console.log("failed",err))
//       )
//     },[])
    
//     return(
//       <div>
//         <Toaster/>
//       </div>
//     )
//   }

// export default Notification
